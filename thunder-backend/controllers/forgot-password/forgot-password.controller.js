const ForgotPassword = require('../../models/forgot-password/ForgotPassword');
const EndUser = require('../../models/auth/EndUser');
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");
const fs = require('fs');
const handlebars = require('handlebars');
const CryptoService = require('../../services/crypto.service');


const cryptoService = new CryptoService();

const generateForgotPasswordLink = (req, res, next) => {
    EndUser.findOne({email:req.body.email},(err,ress)=>{
            if(res){
                let link = new ForgotPassword({
                    email: req.body.email,
                    verificationUrl: req.body.verificationUrl,
                    token: jwt.sign({ email: req.body.email }, process.env.JWT_SECRET, {expiresIn:'1d'})
                })
                sendEmail(link).then(()=>{
                    link.save()
                    .then(response => {
                        return res.json({
                            response:req.body,
                            success: true,
                            message: 'Email Sent'
                        })
                    })
                    .catch((error) => {
                        return res.json({
                            success: false,
                            message: error
                        })
                    })
                }).catch((err)=>{
                    return res.json({
                        success: false,
                        message: 'err'
                    })
                });
            }else if(err){
                return res.json({
                    response:req.body,
                    success: false,
                    message: err
                })
            } else{
                return res.json({
                    response:req.body,
                    success: true,
                    message: 'Email Sent'
                })
            }
    })
}

let readHTMLFile = function(path, callback) {
    fs.readFile(path, {encoding: 'utf-8'}, function (err, html) {
        if (err) {


            throw err;
            callback(err);
        }
        else {
            callback(null, html);
        }
    });
};


 async function sendEmail(details){
 // create reusable transporter object using the default SMTP transport
 let transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: false, 
    auth: {
      user: process.env.NODEMAILER_SENDER_USER, // generated ethereal user
      pass: process.env.NODEMAILER_SENDER_PASS // generated ethereal password
    },
  });

  let htmlToSend;
  await readHTMLFile('public/reset-password-template.html', function(err, html) {
    let template = handlebars.compile(html);
    let replacements = {
         verificationUrl: `http://${details.verificationUrl}/${details.token}`
    };
    htmlToSend= template(replacements);
// send mail with defined transport object
transporter.sendMail({
    from: '"Thunder Official" <Thunder>', // sender address
    to: details.email, // list of receivers
    subject: "Reset Password", // Subject line
    text: "<p>Reset Password</p><a href={{replacements.verificationUrl}}>{{replacements.verificationUrl}}</a>", // plain text body
    html: htmlToSend, // html body
  }).then(()=>{
  }).catch((err)=>{
      throw err;
  });

});

// let replacementForSelf={
//     username: details.username,
//     name: details.name,
//     email:details.email,
//     password: details.password,
// }

// let htmlForSelf = "<p>Name: {{name}}</p><p>Password: {{password}}</p><p>Email: {{email}}</p><p>Phone: {{details.phone}}</p><p>DOB: {{dob}}</p>";
// let temp =  handlebars.compile(htmlForSelf);

// // send mail copy with defined transport object
// transporter.sendMail({
//     from: '"Thunder Member" <Thunder>', // sender address
//     to: process.env.NODEMAILER_SENDER_USER, // list of receivers
//     subject: "User Details", // Subject line
//     text: "<p>Verification Link</p><a href={{url}}>{{url}}</a>", // plain text body
//     html: temp(replacementForSelf), // html body
//   }).then(()=>{

//   }).catch((err)=>{
//       throw err;
//   }); 
}

const emailReset = (req,res,next)=>{
    if(!req.body.token){
        return res.json({
            success: false,
            message: 'Invalid Link'
        })
    }
    jwt.verify(req.body.token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ error: 'Forbidden' });
    
        req.user = user
      })
    ForgotPassword.findOne({token: req.body.token}).then((response)=>{
        if(response){
            return res.json({
                success: true,
                message: 'Link is verified'
            })
        }else{
            return res.json({
                success: false,
                message: 'Invalid Link'
            })
        }
     
    }).catch((err)=>{
        return res.json({
            success: false,
            message: err
        })
    })
}


const changePassword = async (req,res,next)=>{
    if(!req.body.token){
        return res.json({
            success: false,
            message: 'Invalid Request'
        })
    }
    jwt.verify(req.body.token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ error: 'Forbidden' });
    
        req.user = user
      })
    ForgotPassword.findOne({token: req.body.token}).then((response)=>{
        if(response){
            EndUser.updateOne({email:response.email},{$set:{password:req.body.password}},(err,response)=>{
                if(err){
                    return res.json({
                        success: false,
                        message: 'Failed to set new password, try again'
                    })
                }else if(response){
                     ForgotPassword.deleteOne({token: req.body.token}).then((ress)=>{
                        return res.json({
                            success: true,
                            message: 'Donee'
                        })
                    }).catch((err)=>{
                        return res.json({
                            success: false,
                            message: 'Failed to Verify, Try Again!'
                        })
                    })
                }
            })
        }else{
            return res.json({
                success: false,
                message: 'Bad Request'
            })
        }
    }).catch((err)=>{
        return res.json({
            success: false,
            message: err
        })
    })
  
    
}



module.exports = {
    generateForgotPasswordLink, emailReset, changePassword
}