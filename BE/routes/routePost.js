const express = require('express');
const mongo = require('mongoose');
const SchemaPost = require('../models/SchemaPost');
const { validateMiddleware, validationNewPost } = require('../middleware/midValidationExpress');
const fs = require('fs');

const router = express.Router();




// Get all posts
router.get('/posts', (req, res) => {
  const { page = 1, itemForPage = 9 } = req.query;

  SchemaPost.find()
    .populate({
      path: 'author',
      select: 'name surname avatar',
    })
    .limit(itemForPage)
    .skip((page - 1) * itemForPage)
    .sort({ createdAt: -1 })
    .then((posts) => {
      if (posts.length === 0) {
        return res.status(404).json({
          statusCode: 404,
          message: 'No posts found!',
        });
      }

      res.status(200).json({
        statusCode: 200,
        message: 'Posts retrieved successfully',
        posts,
        pagination: Math.ceil(SchemaPost.countDocuments() / itemForPage),
      });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({
        statusCode: 500,
        message: 'Internal server error',
      });
    });
});


// New Post
const checkFilePresence = require('../middleware/midCheckFilePresence');

router.post('/posted', checkFilePresence, validationNewPost, validateMiddleware, (req, res) => {
  const cover = req.file ? req.file.filename : undefined;
  const newPost = new SchemaPost({
    title: req.body.title,
    category: req.body.category,
    cover: cover || req.body.coverImg,
    readTime: {
      value: req.body.readTime,
      unit: 'minute',
    },
    content: req.body.content,
    author: req.userId,
  });



  newPost.save()
    .then((newPost) => {
      res.status(201).send({
        statusCode: 201,
        message: 'Post created successfully',
        newPost,
      });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send({
        statusCode: 500,
        message: 'Internal server error',
      });
    });
});




// Get posts by author
router.get('/MyPosts', (req, res) => {
  SchemaPost.find({ author: req.userId })
    .populate({
      path: 'author',
      select: 'name surname avatar',
    })
    .then((posts) => {
      if (posts.length === 0) {
        return res.status(404).json({
          statusCode: 404,
          message: 'No posts found!',
        });
      }

      res.status(200).json({
        statusCode: 200,
        message: 'Posts retrieved successfully',
        posts,
      });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({
        statusCode: 500,
        message: 'Internal server error',
      });
    });
});


//Delate post by id
router.delete('/delete/:id', (req, res) => {
  const { id } = req.params;
  SchemaPost.findByIdAndDelete(id)
    .then((post) => {
      if (!post) {
        return res.status(404).json({
          statusCode: 404,
          message: 'Post not found!',
        });
      }

      const imagePath = `images/${post.cover}`;
      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error(err);
        } else {
          console.log('Immagine eliminata con successo dopo l\'eliminazione del post.');
        }
      });

      res.status(200).json({
        statusCode: 200,
        message: 'Post deleted successfully',
        post,
      });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({
        statusCode: 500,
        message: 'Internal server error',
      });
    });
});


module.exports = router;
