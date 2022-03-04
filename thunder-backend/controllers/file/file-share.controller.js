const FileUpload = require('../../models/file/File');
const FileShare = require('../../models/file/FileShare');
const Dashboard = require('../../models/dashboard/Dashboard');
const { v4: uuidv4 } = require('uuid');
const CryptoService = require('../../services/crypto.service');


const cryptoService = new CryptoService();

const generateLink = async (req, res, next) => {
    if (!req.body.id) {
        res.json({
            success: false,
            message: 'Bad Request'
        });
        return
    }
    FileUpload.findOne({ _id: req.body.id }).then(response => {
        const FileShareDetails = new FileShare({
            email: response.email,
            linkId: uuidv4(),
            isPasswordProtected: response.ispasswordprotected,
            fileUrl: response.fileurl,
            fileType: response.fileType,
            docPassword: response.docpassword,
            altId: response._id
        });
        FileShareDetails.save().then(response => {
            FileUpload.updateOne({ _id: req.body.id }, { $set: { linkGenerated: true, shareableLink: response.linkId } }).then(response => {
                res.json({
                    response,
                    success: true,
                })
                return;
            }).catch(error => {
                res.json({
                    success: false,
                    message: error
                })
                return;
            })
            res.json({
                response,
                success: true,
                message: 'Link Generated'
            })
            return
        })
            .catch((error) => {
                res.json({
                    success: false,
                    message: error
                })
                return
            })
    }).catch(err => {
        res.json({
            success: false,
            message: error
        })
    })
}

const getFileByLink = async (req, res, next) => {
    FileShare.findOne({ linkId: req.query.id }).then(response => {
        if (response) {
            // Dashboard.findOne({email: response.email},(er,re)=>{
            //         if(er){
            //             return res.json({
            //                 success: false,
            //                 message: er
            //             })
            //         }else if(re){
            //             Dashboard.updateOne({email: req.body.email}, {$set: {totalViews:(re.totalViews+1)}}).then((r)=>{
            //                 return res.json({
            //                     response,
            //                     success: true,
            //                     message: 'File'
            //                 })
            //             }).catch(err => {
            //                 return res.json({
            //                     success: false,
            //                     message: err
            //                 })
            //             })
            //         }
            // })
            try {
                updateTotalViews(response.email);
                return res.json({
                    response,
                    success: true,
                    message: 'File'
                })
            } catch {
                return res.json({
                    success: false,
                    message: err
                })
            }


        } else {
            return res.json({
                success: false,
                message: 'File not found'
            })
        }

    }).catch(err => {
        return res.json({
            success: false,
            message: err
        })
    })
}

const updateTotalViews = async (email) => {
            Dashboard.updateOne({ email }, { $push: { totalViews: {time:new Date()} } }).then((r) => {
                return true
            }).catch(err => {
                return false
            })
}



module.exports = {
    generateLink, getFileByLink
}