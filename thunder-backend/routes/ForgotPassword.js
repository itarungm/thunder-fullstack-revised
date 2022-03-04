const express =  require('express');
const router = express.Router();

const ForgotPasswordController = require('../controllers/forgot-password/forgot-password.controller');

router.post('/generateLink',ForgotPasswordController.generateForgotPasswordLink);
router.post('/resetEmail',ForgotPasswordController.emailReset);
router.post('/changePassword',ForgotPasswordController.changePassword);

module.exports = router;