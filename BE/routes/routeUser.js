const express = require('express');
const bcrypt = require('bcrypt');

const SchemaUser = require('../models/SchemaUser');

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


//Validation for delate user
router.post('/validationDelete', validationToken, (req, res) => {
  SchemaUser.findById(req.userId)
    .then((response) => {
      if (!response) {
        return res.status(404).json({
          message: 'User not found',
        });
      }
      return bcrypt.compare(req.body.password, response.password);
    })
    .then((pass) => {
      if (!pass) {
        return res.status(401).json({
          message: 'Authentication failed',
        });
      }
      return SchemaUser.findById(req.userId);
    })
    .then((response) => {
      res.status(201).json({
        message: 'User found',
        data: response,
      });
    })
    .catch((error) => {
      res.status(500).json({
        error: error.message,
      });
    });
});


// Delete user
router.delete('/delete', validationToken, (req, res) => {
  SchemaUser.findByIdAndDelete(req.userId)
    .then((response) => {
      if (!response) {
        return res.status(404).json({
          message: 'User not found',
        });
      }
      res.status(201).json({
        message: 'User deleted successfully',
        data: response,
      });
    })
    .catch((error) => {
      res.status(500).json({
        error: error.message,
      });
    });
});

module.exports = router;
