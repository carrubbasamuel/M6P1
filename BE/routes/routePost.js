const express = require('express');
const mongo = require('mongoose');
const SchemaPost = require('../models/SchemaPost');


const router = express.Router();





router.get('/posts', async (req, res) => {
  try {
    const posts = await SchemaPost.find().populate({
      path: 'author',
      select: 'name surname avatar',
    });

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
router.post('/posted', async (req, res) => {
  try {
    const newPost = new SchemaPost({
      title: req.body.title,
      category: req.body.category,
      cover: req.body.cover,
      readTime: req.body.readTime,
      content: req.body.content,
      author: req.userId, // Riferimento all'ID dell'utente
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
router.get('/MyPosts', async (req, res) => {
  try {
    const posts = await SchemaPost.find({ author: req.userId }).populate({
      path: 'author',
      select: 'name surname avatar',
    });
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