const express =  require('express');
const router = express.Router();

const dashboardStatisticsController = require('../controllers/dashboard/dashboard.controller');

router.get('/statistics',dashboardStatisticsController.dashboardStatistics);

module.exports = router;