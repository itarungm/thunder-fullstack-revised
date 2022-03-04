const express =  require('express');
const router = express.Router();

const EndUserController = require('../controllers/auth/EndUserAuth');

router.get('/list',EndUserController.index);
router.post('/register',EndUserController.register);
router.post('/verifyEmail',EndUserController.verifyEmail);
router.post('/login',EndUserController.login);

module.exports = router;