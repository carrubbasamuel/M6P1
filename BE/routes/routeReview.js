const express = require('express');
const verifyToken = require('../middleware/middJWT');
const router = express.Router();
const Review = require('../models/SchemaReview');


router.post('/addReview', verifyToken,  (req, res) => {
    const { comment, rate, postId } = req.body;
    const newReview = new Review({
        comment,
        rate,
        postId,
        authorId: req.userId,
    });
    newReview.save()
        .then(review => {
            res.json(review);
        })
        .catch(err => {
            res.json(err);
        })
});



router.get('/getReviews/:postId',verifyToken, (req, res) => {
    const { postId } = req.params;
    Review.find({ postId })
        .populate('authorId', 'email')
        .then(reviews => {
            res.json(reviews);
        })
        .catch(err => {
            res.json(err);
        })
});



module.exports = router;