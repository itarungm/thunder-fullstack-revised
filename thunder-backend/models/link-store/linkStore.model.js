const mongoose = require('mongoose');


const subcategorySchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    hostUrl:{
      type: String
    },
    iconUrl:{
        type: String,
        required: true
    },
    link:{
        type: String,
        required: true
    }
  },{timestamps: true}); 

const linkCategoryScheme = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  categoryName:{
    type: String,
    required: true
  },
  sortId:{
    type: Number,
    required: true
  },
  subcategory:[subcategorySchema]
}, { timestamps: true })

const linkStoreScheme = new mongoose.Schema({
    email: {
      type: String,
      required: true
    },
    categoryList:[linkCategoryScheme],
    isPasswordProtected:   {
      type: Boolean
    },
    isTitleAvailable:{
      type: Boolean
    },
    title:{
      type: String
    },
    password:{
      type: String
    },
    isShareable:   {
      type: Boolean
    },
    shareLink:{
      type: String
    }
  }, { timestamps: true })


const LinkStore = mongoose.model('LinkStore', linkStoreScheme);

module.exports = LinkStore
