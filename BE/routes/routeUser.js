const express = require('express');
const bcrypt = require('bcrypt');

const SchemaUser = require('../models/SchemaUser');


//Router
const router = express.Router();

//middleware Login
const bcrypterAuth = require('../middleware/midwareLogin');
const validationToken = require('../middleware/middJWT');



//login decrypting pw
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



//When register crypting pw
router.post('/register', async (req, res) => {
    bcrypt.hash(req.body.password, 10)//crypting password
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



router.post('/validationDelete', validationToken, async (req, res) => {
    try{
        const response = await SchemaUser.findById(req.userId);
        if(!response){
            return res.status(404).json({
                message: 'User not found',
            });
        }
        const pass = await bcrypt.compare(req.body.password, response.password);
        if(!pass){
            return res.status(401).json({
                message: 'Authentication failed',
            });
            
        }
        res.status(201).json({
            message: 'User found',
            data: response,
        });
    }
    catch(error){
        res.status(500).json({
            error: error.message,
        });
    }
});


router.delete('/delete', validationToken, async (req, res) => {
    try {
        console.log(req.userId);
        const response = await SchemaUser.findByIdAndDelete(req.userId);
        if (!response) {
            return res.status(404).json({
                message: 'User not found',
            });
        }
        res.status(201).json({
            message: 'User deleted successfully',
            data: response,
        });
    } catch (error) {
        res.status(500).json({
            error: error.message,
        });
    }
});








module.exports = router;