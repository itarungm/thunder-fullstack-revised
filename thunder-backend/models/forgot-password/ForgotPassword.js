const mongoose = require('mongoose');

const forgotPasswordScheme = new mongoose.Schema({
  email: {
    type: String
  },
  token: {
    type: String
  },
  verificationUrl:{
    type: String
  }

}, { timestamps: true })

const ForgotPassword = mongoose.model('ForgotPassword', forgotPasswordScheme);

module.exports = ForgotPassword
