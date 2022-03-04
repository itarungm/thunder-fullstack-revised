const express = require('express');
const cors = require('cors');
// const CronController = require('./controllers/cronController');
require('dotenv').config();
require('./database/db');
const createError = require('http-errors');
fs = require('fs');
multer  = require('multer');


//IMPORTING ALL-ROUTES
const allRoute = require('./routes/AllRoutes');

//INITIALIZING EXPRESS APP
const app = express();


//MIDDLEWARES
app.use(cors({
    origin:'*'
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//INITIALIZING ALL-ROUTES
allRoute.routes(app);

//404 ROUTE
app.use(async (req, res, next) => {
    next(createError.NotFound('This route does not exist'));
})

//ERROR HANDLER
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
        error: {
            status: err.status || 500,
            message: err.message,
        }
    })
})

//CONFIGURING PORT
const PORT = process.env.PORT || 3000;

//RUNNING THE SERVER
app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`)
})


module.exports = app;