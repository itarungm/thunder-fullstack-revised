const mongoose = require('mongoose');


const totalViewSchema = new mongoose.Schema({
  time: {
    type: Date
  } 
});

const dashboardScheme = new mongoose.Schema({
  email: {
    type: String
  },
  totalViews:[totalViewSchema],
  uploadCount:{
      type: Number
  },
  todayViews: {
      type: Number
  },
  passwordProtected:{
      type: Number
  }
}, { timestamps: true })

const Dashboard = mongoose.model('Dashboard', dashboardScheme);

module.exports = Dashboard
