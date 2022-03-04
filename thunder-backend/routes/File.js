const express =  require('express');
const router = express.Router();
const UploadController = require('../controllers/file/file.controller');

const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() })


router.post('/upload', upload.single('file'),UploadController.upload);
router.post('/delete',UploadController.deleteFile);
router.post('/files',UploadController.userFiles);
router.put('/changeProtection',UploadController.changeFileProtectionStatus);
router.post('/uploadLimitDetails',UploadController.uploadLimitDetails);

module.exports = router;