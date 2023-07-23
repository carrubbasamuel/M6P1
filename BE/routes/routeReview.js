const express = require('express');
const mongoose = require('mongoose');
const verifyToken = require('../middleware/middJWT');
const router = express.Router();
const Review = require('../models/SchemaReview');


router.post('/addReview', verifyToken, (req, res) => {
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





router.get('/getReviews/:postId', verifyToken, async (req, res) => {
    const { postId } = req.params;
    const { userId } = req;
    try {
        const reviews = await Review.find({ postId })
            .populate('authorId', 'email name surname avatar')
            .lean();

        // Aggiungi il campo isMine a ciascuna recensione
        reviews.forEach(review => {
            review.isMine = review.authorId._id.toString() === userId.toString();
        });


        res.json(reviews);
    } catch (err) {
        res.json(err);
    }
});

router.delete('/deleteReview/:reviewId', verifyToken, (req, res) => {
    const { reviewId } = req.params;
    Review.findByIdAndDelete(reviewId)
        .then(review => {
            if (!review) {
                return res.status(404).json({
                    statusCode: 404,
                    message: 'Review not found!',
                });
            }
            return res.status(200).json({
                statusCode: 200,
                message: 'Review deleted successfully',
                review,
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