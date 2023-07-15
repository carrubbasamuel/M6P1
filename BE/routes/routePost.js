const express = require('express');
const mongo = require('mongoose');
const SchemaPost = require('../models/SchemaPost');
const SchemaUser = require('../models/SchemaUser');


const router = express.Router();





router.get('/posts', async (req, res) => {
  try {
    const posts = await SchemaPost.find().populate('author');

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
  } catch (error) {
    console.error(error);
    res.status(500).json({
      statusCode: 500,
      message: 'Internal server error',
    });
  }
});


// Post new post
router.post('/posted/:id', async (req, res) => {
  try {
    const newPost = new SchemaPost({
      title: req.body.title,
      category: req.body.category,
      cover: req.body.cover,
      content: req.body.content,
      author: req.middle, // Riferimento all'ID dell'utente
    });

    await newPost.save();

    res.status(201).send({
      statusCode: 201,
      message: 'Post created successfully',
      newPost,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      statusCode: 500,
      message: 'Internal server error',
    });
  }
});


// Get posts by author 
router.get('/MyPosts/:id', async (req, res) => {
  try {
    const posts = await SchemaPost.find({ author: req.params.id }).populate('author');
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
  } catch (error) {
    console.error(error);
    res.status(500).json({
      statusCode: 500,
      message: 'Internal server error',
    });
  }
});





module.exports = router;