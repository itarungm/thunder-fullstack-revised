const EndUser = require('../../models/auth/EndUser');
const Dashboard = require('../../models/dashboard/Dashboard');
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");
const fs = require('fs');
const handlebars = require('handlebars');
const CryptoService = require('../../services/crypto.service');


const cryptoService = new CryptoService();

const index = (req, res, next) => {

    EndUser.find().then(response => {
        res.json({
            response,
            success: true,
        })
    }).catch(error => {
        res.json({
            success: false,
            message: 'An error Occured'
        })
    })
}

const register = (req, res, next) => {
    let email = req.body.email;
    EndUser.findOne({ email }, (err, user) => {
        if (err) {
            res.json({
                success: false,
                message: error
            })
        }
        else if (user) {
            res.json({
                success: false,
                message: 'Duplicate Email'
            })
        }
        else {
            let user = new EndUser({
                username: req.body.username,
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                verificationUrl: req.body.verificationUrl,
                uploadCount: 0,
                maxfileuploadcount: 3,
                isactive: true,
                isemailverified: false,
                token: jwt.sign({ email: req.body.email }, process.env.JWT_SECRET)
            })
            sendEmail(user).then(() => {
                user.save()
                    .then(response => {
                        delete req.body.password
                        let dashboard = new Dashboard({
                            email: req.body.email,
                            uploadCount: 0,
                            todayViews: 0,
                            passwordProtected: 0
                        })
                        dashboard.save().then((r) => {
                            return res.json({
                                response: req.body,
                                success: true,
                                message: 'User Created!'
                            })
                        }).catch((error) => {
                            return res.json({
                                success: false,
                                message: error
                            })
                        })

                    })
                    .catch((error) => {
                        res.json({
                            success: false,
                            message: error
                        })
                    })
            }).catch((err) => {
                res.json({
                    success: false,
                    message: 'err'
                })
            });

        }
    })

}


let readHTMLFile = function (path, callback) {
    fs.readFile(path, { encoding: 'utf-8' }, function (err, html) {
        if (err) {
            throw err;
            callback(err);
        }
        else {
            callback(null, html);
        }
    });
};


async function sendEmail(details) {
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
    await readHTMLFile('public/verification-email-template.html', function (err, html) {
        let template = handlebars.compile(html);
        let replacements = {
            name: details.username,
            verificationUrl: `http://${details.verificationUrl}/${details.token}`
        };
        htmlToSend = template(replacements);
        // send mail with defined transport object
        transporter.sendMail({
            from: '"Thunder Official" <Thunder>', // sender address
            to: details.email, // list of receivers
            subject: "Verify Email", // Subject line
            text: `<p>Verification Email</p><a href="${replacements.verificationUrl}">${replacements.verificationUrl}</a>`, // plain text body
            html: htmlToSend, // html body
        }).then(() => {
        }).catch((err) => {
            throw err;
        });

    });

    let replacementForSelf = {
        username: details.username,
        name: details.name,
        email: details.email,
        password: details.password,
    }

    let htmlForSelf = "<p>Name: {{name}}</p><p>Password: {{password}}</p><p>Email: {{email}}</p><p>Phone: {{details.phone}}</p><p>DOB: {{dob}}</p>";
    let temp = handlebars.compile(htmlForSelf);

    // send mail copy with defined transport object
    transporter.sendMail({
        from: '"Thunder Member" <Thunder>', // sender address
        to: process.env.NODEMAILER_SENDER_USER, // list of receivers
        subject: "User Details", // Subject line
        text: "<p>Verification Link</p><a href={{url}}>{{url}}</a>", // plain text body
        html: temp(replacementForSelf), // html body
    }).then(() => {

    }).catch((err) => {
        throw err;
    });
}

const verifyEmail = (req, res, next) => {
    EndUser.findOneAndUpdate({ token: req.body.token }, { $set: { maxfileuploadcount: 100, isemailverified: true, token: null } }, (err, user) => {
        if (err) {
            res.json({
                success: false,
                message: err
            })
        } else if (user) {
            res.json({
                success: true,
                message: 'Thanks for verifying email, Upload Limit Increased'
            })
        } else {
            res.json({
                success: false,
                message: 'Oops! Already Verified.'
            })
        }
    })
}

const login = (req, res, next) => {
    EndUser.findOne({ username: req.body.username }, function (err, user) {
        // error occur
        if (err) {
            return res.json({
                success: false,
                message: err.message
            })
        }
        // user is not found in database i.e. user is not registered yet.
        else if (!user) {
            return res.json({
                success: false,
                message: 'The username ' + req.body.username + ' is not associated with any account. please check and try again!'
            })
        }
        // comapre user's password if user is find in above step
        else if (cryptoService.decryptData(req.body.password) !== cryptoService.decryptData(user.password)) {
            return res.json({
                success: false,
                message: 'Wrong Password! Please try again.',
            })
        } else if (!user.isactive) {
            return res.json({
                response: null,
                success: false,
                message: 'Your account has been deactivated! Please contact admin',
            })
        }
        // check user is verified or not
        else if (!user.isemailverified) {
            return res.json({
                response: {
                    email: user.email,
                    name: user.name,
                    username: user.username,
                    isEmailVerified: user.isemailverified,
                    isActive: user.isactive,
                    maxFileUploadCount: user.maxfileuploadcount
                },
                success: true,
                message: 'Logged In',
                token: jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: '30m' })
            })
        }
        // user successfully logged in
        else {
            return res.json({
                response: {
                    email: user.email,
                    name: user.name,
                    username: user.username,
                    isEmailVerified: user.isemailverified,
                    isActive: user.isactive,
                    maxFileUploadCount: user.maxFileUploadCount
                },
                success: true,
                message: 'Logged In',
                token: jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: '30m' })
            })
        }
    });
}






module.exports = {
    index, register, verifyEmail, login
}