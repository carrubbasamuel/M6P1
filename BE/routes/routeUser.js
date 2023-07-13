const express = require('express');

const SchemaUser = require('../models/SchemaUser');
const SchemaPost = require('../models/SchemaPost');

const router = express.Router();



router.post('/login', async (req, res) => {
    const { mail, password } = req.body;
    try {
        const find = await SchemaUser.findOne({ mail, password });
        if (find) {
            res.status(200).send({
                statusCode: 200,
                message: 'Login successfully',
                find,
            })
        }
        else {
            res.status(404).send({
                statusCode: 404,
                message: 'Login failed',
            })
        }
    } catch (error) {
        res.status(500).send({
            statusCode: 500,
            message: 'Login Error',
            error,
        })
    }
})



router.post('/register', async (req, res) => {
    const request = new SchemaUser(req.body);
    console.log(request);
    try {
        const newUser = await request.save();
        res.status(201).send({
            statusCode: 201,
            message: 'User created successfully',
            newUser,
        })
    }
    catch (error) {
        res.status(400).send({
            statusCode: 400,
            message: 'User not created',
            error,
        })
    }
});




module.exports = router;