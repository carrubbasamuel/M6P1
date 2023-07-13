const express = require('express');
const mongo = require('mongoose');  
const SchemaAuthor = require('../models/SchemaAuthor');
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
  





router.post('/posted/:id', async (req, res) => {
    try {
      const userId = req.params.id;
      const findUser = await SchemaUser.findById(userId);
      
      if (findUser) {
        const newPost = new SchemaPost({
          title: req.body.title,
          category: req.body.category,
          cover: req.body.cover,
          content: req.body.content,
          author: findUser, // Riferimento all'ID dell'utente
        });
  
        await newPost.save();
  
        res.status(201).send({
          statusCode: 201,
          message: 'Post created successfully',
          newPost,
        });
      } else {
        res.status(404).send({
          statusCode: 404,
          message: 'User not found!',
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send({
        statusCode: 500,
        message: 'Internal server error',
      });
    }
  });


/* 

router.patch("/authors/:id", async (req, res) => {
    const {id} = req.params;
	const user = await SchemaAuthor.findById(id);

	if (!user) {
		return res.status(404).send({
			statusCode: 404,
			message: `Post with id ${id} not found!`,
		});
	}

	try {
		const postId = id;
		const dataToUpdate = req.body;
		const options = { new: true };

		const result = await SchemaAuthor.findByIdAndUpdate(
			postId,
			dataToUpdate,
			options
		);

		res.status(200).send({
			statusCode: 200,
			message: `Post with id ${id} modified successfully`,
			result,
		});
	} catch (error) {
		res.status(500).send({
			statusCode: 500,
			message: "Internal server Error",
			error,
		});
	}
});



router.delete("/authors/:id", async (req, res) => {
    const { id } = req.params;
    const user = await SchemaAuthor.findById(id);
    if(!user){
        res.status(404).send({
            statusCode: 404,
            message: `Author with id ${id} not found!`,
        })
    }
    try {
        const result = await SchemaAuthor.findByIdAndDelete(id);
        res.status(200).send({
            statusCode: 200,
            message: `Author with id ${id} deleted successfully`,
            result,
        })
    } catch (error) {
        res.status(500).send({
            statusCode: 500,
            message: `Author with id ${id} not deleted!`,
            error,
        })
    }
}) */




module.exports = router;