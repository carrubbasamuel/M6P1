const mongoose = require('mongoose');

const SchemaUser = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
      type: String,
      required: true,
  },
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: false,
  },
  born_date: {
    type: String,
    required: false,
  },
  avatar: {
    type: String,
    required: false,
  }
},{ timestamps: true, strict: true });

module.exports = mongoose.model('User', SchemaUser, 'users');
