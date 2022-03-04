const FileUpload = require('../../models/file/File');
const FileShare = require('../../models/file/FileShare');
const Dashboard = require('../../models/dashboard/Dashboard');
const User = require('../../models/auth/EndUser');
const firebaseAdmin = require('firebase-admin');
const { v4: uuidv4 } = require('uuid');
const serviceAccount = require('../../thunder-official-firebase-adminsdk-poq1e-df3f30f778.json');
const CryptoService = require('../../services/crypto.service');


const cryptoService = new CryptoService();

const admin = firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAccount),
});

const storageRef = admin.storage().bucket(`gs://thunder-official.appspot.com`);

async function uploadFile(buffer, filename, contentType, email) {
    const uuid = uuidv4();

    const storage = storageRef.file(`${email}/${uuid}`);
    await storage.save(buffer, { contentType, public: true })
    return uuid;
}

async function deleteImageFromFirebase(email, imageName) {
    const deleted = await storageRef.file(`${email}/${imageName}`).delete();
    return deleted;
}


const upload = async (req, res, next) => {
    if (!req.file || !req.body.email) {
        res.json({
            success: false,
            message: 'No File Added'
        });
        return
    }
    let maxUploadCount = 3;
    await User.findOne({ email: req.body.email }).then((userDetails) => {
        maxUploadCount=userDetails.maxfileuploadcount;
    }).catch((err) => {
        return res.json({
            success: false,
            message: err
        })
    })
    let fileUploadCount = 0;
    await FileUpload.find({ email: req.body.email }).then((totalData) => {
        fileUploadCount = totalData.length;
        
    }).catch((err) => {
        return res.json({
            success: false,
            message: err
        })
        
    })
    if(fileUploadCount>=maxUploadCount){
        return res.json({
            success: false,
            message: 'Max Upload Limit Reached!'
        });
    }
    let URL;
    try {
        URL = await uploadFile(req.file.buffer, req.file.originalname, req.file.mimetype, req.body.email);
    } catch {
        res.json({
            success: false,
            message: 'Failed to Upload!'
        });
        return
    }
    const uploadDetails = new FileUpload({
        email: req.body.email,
        filename: req.file.originalname,
        ispasswordprotected: false,
        fileurl: cryptoService.encryptData(URL),
        linkGenerated: false,
        fileType: cryptoService.encryptData(req.body.type)
    });
    
    uploadDetails.save().then(response => {
        fileUploadCount++
        User.updateOne({ email: req.body.email }, { $set: { uploadCount: fileUploadCount } }).then((updated) => {
            updateUploadCount(req.body.email)
            return res.json({
                response: { url: URL, filename: req.file.originalname },
                success: true,
                message: 'File Uploaded'
            })
        }).catch((errors) => {
            return res.json({
                success: false,
                message: errors
            })
        })

    }).catch((error) => {
        return res.json({
            success: false,
            message: error
        })
    })

}

const deleteFile = async (req, res, next) => {
    if (!req.body.email || !req.body.name) {
        res.json({
            success: false,
            message: 'No Proper Input. Email and File name is mandatory!'
        });
        return
    }
    try {
        let uploadCount = 3;
        await User.findOne({ email: req.body.email }).then((userDetails) => {
            uploadCount=userDetails.uploadCount;
        }).catch((err) => {
            res.json({
                success: false,
                message: err
            })
            return;
        })
        let URL = await deleteImageFromFirebase(req.body.email, cryptoService.decryptData(req.body.name));
        
        FileUpload.deleteOne({ _id: req.body.id }).then(response => {
            updateUploadCount(req.body.email);
            if (req.body.linkGenerated) {
                FileShare.deleteOne({ altId: req.body.id }).then(res1 => {
                    User.updateOne({email:req.body.email},{$set:{uploadCount:(uploadCount-1)}}).then((updated)=>{
                        res.json({
                           response,
                           success: true,
                           message: 'Deleted!'
                       })
                       return 
                   }).catch((errrr)=>{
                       res.json({
                           success: false,
                           message: errrr
                       })
                       return 
                   })
                   return;
                }).catch(err => {
                    res.json({
                        success: false,
                        message: err
                    })
                    return
                })
            } else {
                User.updateOne({email:req.body.email},{$set:{uploadCount:(uploadCount-1)}}).then((updated)=>{
                    res.json({
                       response,
                       success: true,
                       message: 'Deleted!'
                   })
                   return 
               }).catch((errrr)=>{
                   res.json({
                       success: false,
                       message: errrr
                   })
                   return 
               })
               return;
            }
        }
        ).catch(error => {
            res.json({
                success: false,
                message: error
            })
            return
        }

        )

    }
    catch {
        res.json({
            success: false,
            message: 'Failed to Delete!'
        });
        return
    }
}

const userFiles = (req, res, next) => {
    FileUpload.find({ email: req.body.email }).then(response => {
        res.json({
            response,
            success: true,
        })
    }).catch(error => {
        res.json({
            success: false,
            message: error
        })
    })
}

const changeFileProtectionStatus = (req, res, next) => {
    FileUpload.findOneAndUpdate({ _id: req.body.id }, { $set: { ispasswordprotected: req.body.protected, docpassword: req.body.protected ? req.body.password : null } }).then(response => {
        if(req.body.protected){
            updateProtectedFileCount(response.email)
        }
            if (response.linkGenerated) {
                FileShare.updateOne({ altId: req.body.id }, { $set: { isPasswordProtected: req.body.protected, docPassword: req.body.protected ? req.body.password : null } }).then((res1) => {
                    res.json({
                        response,
                        success: true,
                    })
                    return;
                }).catch((err) => {
                    res.json({
                        success: false,
                        message: err
                    })
                    return;
                })
            } else {
                res.json({
                    response,
                    success: true,
                })
            }
    }).catch(error => {
        res.json({
            success: false,
            message: error
        })
    })
}

const uploadLimitDetails = (req, res, next) => {
    User.findOne({ email: req.body.email }).then(response => {
        res.json({
            response:{
                isActive: response.isactive,
                username: response.username,
                isEmailVerified: response.isemailverified,
                maxFileUploadCount: response.maxfileuploadcount
            },
            success: true,
        })
    }).catch(error => {
        res.json({
            success: false,
            message: error
        })
    })
}

const updateUploadCount = async (email) => {
    User.findOne({email},(err,user)=>{
        if(err){
            return false
        }else{
            Dashboard.updateOne({email}, {$set:{uploadCount: user.uploadCount}}).then((re)=>{
                return true
            }).catch((er)=>{
                return false
            })

        }
    })
}

const updateProtectedFileCount = async (email) =>{
    FileUpload.find({ispasswordprotected: true},(err,data)=>{
        if(err) return false
        if(data){
            Dashboard.updateOne({email},{$set:{passwordProtected:data.length}},(err,data)=>{
                if(err) return false;
                return true;
            })
        }
    })
}






module.exports = {
    upload, deleteFile, userFiles, changeFileProtectionStatus, uploadLimitDetails
}