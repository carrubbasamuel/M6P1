const mongoose = require('mongoose');

const SchemaAuthor = new mongoose.Schema({

  category: String,
  title: String,
  cover: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  content: String,

}, { timestamps: true, strict: true });

module.exports = mongoose.model('Author', SchemaAuthor, 'authors');


