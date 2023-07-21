const mongoose = require('mongoose');


const SchemaReview = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    rete: {
        type: Number,
        required: true,
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
    }
});

const ModelReview = mongoose.model('Review', SchemaReview, 'reviews');
