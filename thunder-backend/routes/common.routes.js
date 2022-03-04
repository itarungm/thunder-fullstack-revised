const express =  require('express');
const router = express.Router();

const CommonController = require('../controllers/common.controller');

router.get('/checkUsername',CommonController.checkUsername);

module.exports = router;