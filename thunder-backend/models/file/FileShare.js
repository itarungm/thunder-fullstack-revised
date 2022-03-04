const mongoose = require('mongoose');

const FileShareScheme = new mongoose.Schema({
    email: {
        type: String
    },
    altId:{
        type: String
    },
    linkId: {
        type: String
    },
    isPasswordProtected: {
        type: Boolean
    },
    fileUrl: {
        type: String
    },
    fileType:{
        type: String
    },
    docPassword: {
        type: String
    }
}, { timestamps: true })

const FileShareModel = mongoose.model('fileShare', FileShareScheme);

module.exports = FileShareModel
