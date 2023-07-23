const express = require('express');
const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');

const SchemaUser = require('../models/SchemaUser');
const SchemaPost = require('../models/SchemaPost');
const SchemaReview = require('../models/SchemaReview');

// Router
const router = express.Router();

// Middleware Login
const bcrypterAuth = require('../middleware/midwareLogin');
const validationToken = require('../middleware/middJWT');
const { validationNewUser, validateMiddleware } = require('../middleware/midValidationExpress');


// Login decrypting pw
router.post('/login', bcrypterAuth, (req, res) => {
  try {
    const { token, user } = req;
    if (token) {
      res.status(200).send({
        statusCode: 200,
        message: 'Login successfully',
        token,
        user
      });
    } else {
      res.status(401).send({
        statusCode: 401,
        message: 'Authentication failed',
      });
    }
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: 'Internal server error',
      error,
    });
  }
});

// When register crypting pw
router.post('/register', validationNewUser, validateMiddleware, (req, res) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new SchemaUser({
        ...req.body,
        password: hash, // Hash password
      });
      return user.save();
    })
    .then(() => {
      res.status(201).json({
        message: 'User added successfully',
      });
    })
    .catch((error) => {
      res.status(500).json({
        error: error,
      });
    });
});




// Delete user and related posts
router.delete('/delete', validationToken, async (req, res) => {
  const userId = req.userId;

  try {

    const delateReview = await SchemaReview.deleteMany({ authorId: userId });
    let deletedPosts = await SchemaPost.find({ author: userId }).lean();
    deletedPosts.forEach((post) => {
      console.log(post.cover);
      if (!post.cover.startsWith('http://')) {
        const imagePath = `images/${post.cover}`;
        fs.unlink(imagePath, (err) => {
          if (err) {
            console.error(err);
          } else {
            console.log('Immagine eliminata con successo dopo l\'eliminazione del post.');
          }
        });
      }
    });


    deletedPosts = await SchemaPost.deleteMany({ author: userId });
    const deletedUser = await SchemaUser.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({
        message: 'User not found',
      });
    }

    res.status(201).json({
      message: 'User and related posts deleted successfully',
      data: { deletedUser, deletedPosts, delateReview },
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});




module.exports = router;

