
const endUserRoute = require('./EndUserRoutes')
const uploadRoute = require('./File')
const fileShareRoute = require('./FileShare')
const forgotPasswordRoute = require('./ForgotPassword')
const commonRoutes = require('./common.routes')
const dashboardRoute = require('./dashboard.routes')
const linkStoreRoute = require('./link-store.routes')
const authenticateToken = require('../middlewares/verify-authentication')

module.exports = {
    routes: function (app) {
        app.get('/', (req, res) => {
            res.json({ "message": req.headers.origin })
        });
        app.use('/api/common', commonRoutes);
        app.use('/api/auth/user', endUserRoute);
        app.use('/api/forgotPassword', forgotPasswordRoute);
        app.use('/api/file', authenticateToken, uploadRoute);
        app.use('/api/link', fileShareRoute);
        app.use('/api/dashboard',authenticateToken, dashboardRoute);
        app.use('/api/linkStore', linkStoreRoute);
    }
}
