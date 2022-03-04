const EndUser = require('../models/auth/EndUser');

const checkUsername = (req, res, next) => {
    EndUser.findOne({username:req.query.reqUsername}).then(response => {
        if(response){
            res.json({
                response:{isAvailable: false},
                success: true,
            })
        }else{
            res.json({
                response:{isAvailable: true},
                success: true,
            })
        }
        
    }).catch(error => {
        res.json({
            success: false,
            message: 'An error Occured'
        })
    })
}

module.exports = {
    checkUsername
}