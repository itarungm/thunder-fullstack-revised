const express =  require('express');
const router = express.Router();
const FileShareController = require('../controllers/file/file-share.controller');
const authenticateToken = require('../middlewares/verify-authentication')

router.post('/generateLink', authenticateToken, FileShareController.generateLink);
router.get('/fileByLink', FileShareController.getFileByLink);

module.exports = router;