const Dashboard = require('../../models/dashboard/Dashboard');

const dashboardStatistics = async (req, res, next) => {
    if (!req.query.email) {
        return res.json({
            success: false,
            message: 'Bad Request'
        });
    }
    
    Dashboard.findOne({email: req.query.email},(err,data)=>{
        if(err){
            return res.json({
                success: false,
                message: err
            });
        }

        return res.json({
            response: data,
            success: true,
            message: ''
        })

    })
}

module.exports = {
    dashboardStatistics
}