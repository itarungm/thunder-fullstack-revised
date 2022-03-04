const mongoose = require('mongoose');

const FileScheme = new mongoose.Schema({
    email: {
        type: String
    },
    filename: {
        type: String
    },
    ispasswordprotected: {
        type: Boolean
    },
    fileurl: {
        type: String
    },
    docpassword: {
        type: String
    },
    linkGenerated:{
        type: Boolean
    },
    shareableLink:{
        type: String
    },
    fileType:{
        type: String
    }
}, { timestamps: true })

const FileModel = mongoose.model('Uploads', FileScheme);

module.exports = FileModel
