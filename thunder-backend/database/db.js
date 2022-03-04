
const mongoose = require('mongoose');

mongoose.connect(process.env.DB_URI,{ useNewUrlParser: true, useUnifiedTopology: true },()=>{
    // console.log('Connected to DB')
}) 

//CONNECTED CALLBACK FUNCTION
mongoose.connection.on('connected', () => {
    console.log("mongoose connected to Db");
})

//ERROR CALLBACK FUNCTION 
mongoose.connection.on('error', (err) => {
    console.log(err.message);
})

//DISCONNECTED CALLBACK FUNCTION 
mongoose.connection.on('disconnected', () => {
    console.log("mongoose connection is disconnected");
})

//THIS FUNCTION RUNS WHEN WE STOP THE APPLICATION (CONTROL+C)
process.on('SIGINT', async () => {
    await mongoose.connection.close(); //DISCONNECTED CALLBACK FUNCTION
    process.exit(0);
})