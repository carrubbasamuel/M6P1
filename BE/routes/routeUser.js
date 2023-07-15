const express = require('express');
const bcrypt = require('bcrypt');

const SchemaUser = require('../models/SchemaUser');


//Router
const router = express.Router();

//middleware Login
const bcrypterAuth = require('../middleware/midwareLogin');



//login decrypting pw
router.post('/login', bcrypterAuth, (req, res) => {
    try {
        const { token, user } = req;
        if (token) {
            res.status(200).send({
                statusCode: 200,
                message: 'Login successfully',
                token,
                user,
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



//When register crypting pw
router.post('/register', async (req, res) => {
    bcrypt.hash(req.body.password, 10)
    .then((hash)=>{
        const user = new SchemaUser({
            email: req.body.email,
            password: hash,//hash password
            name: req.body.name,
            surname: req.body.surname,
            born_date: req.body.born_date,
            avatar: req.body.avatar,
        });
        user.save().then(()=>{
            res.status(201).json({
                message: 'User added successfully'
            });
        }).catch((error)=>{
            res.status(500).json({
                error: error
            });
        });
    })
    .catch((error)=>{
        res.status(500).json({
            error: error
        });
    });
});







module.exports = router;