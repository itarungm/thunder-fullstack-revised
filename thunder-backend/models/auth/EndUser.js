const mongoose = require('mongoose');

const endUserScheme = new mongoose.Schema({
  username: {
    type: String
  },
  name: {
    type: String
  },
  email: {
    type: String
  },
  password: {
    type: String
  },
  isactive: {
    type: Boolean
  },
  promocode: {
    type: String
  },
  uploadCount: {
    type: Number
  },
  maxfileuploadcount: {
    type: Number
  },
  isemailverified: {
    type: Boolean
  },
  verificationUrl: {
    type: String
  },
  token: {
    type: String
  }

}, { timestamps: true })

const EndUser = mongoose.model('EndUser', endUserScheme);

module.exports = EndUser
