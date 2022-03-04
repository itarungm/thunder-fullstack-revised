const express =  require('express');
const router = express.Router();
const authenticateToken = require('../middlewares/verify-authentication')

const linkStoreController = require('../controllers/link-store/link-store.controller');

router.get('/getAllLinks',authenticateToken,linkStoreController.getAllLinks);
router.post('/createCategory',authenticateToken,linkStoreController.createCategory);
router.post('/createSubcategory',authenticateToken,linkStoreController.createSubcategory);
router.put('/updateCategoryName',authenticateToken,linkStoreController.updateCategoryName);
router.put('/updateSubcategoryLink',authenticateToken,linkStoreController.updateSubcategoryLink);
router.post('/deleteCategory',authenticateToken,linkStoreController.deleteCategory);
router.post('/deleteSubcategory',authenticateToken,linkStoreController.deleteSubcategoryLink);
router.get('/getSettings',authenticateToken,linkStoreController.getSettings);
router.put('/updateSettings',authenticateToken,linkStoreController.updateSettings);
router.get('/getAllLinksForVisitors',linkStoreController.getAllLinksForVisitors);

module.exports = router;