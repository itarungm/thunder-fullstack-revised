const axios = require("axios");
const cheerio = require("cheerio");
const LinkStore = require("../../models/link-store/linkStore.model");
const CryptoService = require('../../services/crypto.service');


const cryptoService = new CryptoService();

const getAllLinks = async (req, res, next) =>{
  if (!req.query.email) {
    return res.json({
      success: false,
      message: "Bad Request"
    });
  }

  LinkStore.findOne({email: req.query.email}).then((data)=>{
    return res.json({
      success: true,
      response:{
        id: data._id,
        categoryList:data.categoryList
      } 
    })
  }).catch((err)=>{
    return res.json({
      success: false,
      message: "Failed to Fetch Links"
    })
  })
}

const createCategory = async (req, res, next) => {
  if (!req.body.email || !req.body.categoryName) {
    return res.json({
      success: false,
      message: "Bad Request",
    });
  }
  LinkStore.findOne({ email: req.body.email }, (err, foundEmail) => {
    console.log(err);
    if (err) {
      return res.json({
        success: false,
        message: "Something Went Wrong",
      });
    }

    const linkStore = new LinkStore({
      email: req.body.email,
      isPasswordProtected: false,
      isTitleAvailable: false,
      isShareable: false
    });

    const category = {
      email: req.body.email,
      categoryName: req.body.categoryName,
      sortId: linkStore.categoryList.length ? linkStore.categoryList.length : 1,
      subcategory: [],
    };

    if (foundEmail) {
      LinkStore.updateOne(
        { email: req.body.email },
        { $push: { categoryList: category } },
        (err, updated) => {
          if (err) {
            return res.json({
              success: false,
              message: "Something Went Wrong",
            });
          }
          return res.json({
            success: true,
            message: "Link Category Created!",
          });
        }
      );
    } else {
      linkStore.categoryList.push(category);

      linkStore
        .save()
        .then((data) => {
          return res.json({
            success: true,
            message: "Link Category Created!",
          });
        })
        .catch((err) => {
          console.log(err);
          return res.json({
            success: false,
            message: "Failed to Create Category!",
          });
        });
    }
  });
};

const createSubcategory = async (req, res, next) => {
  if (!req.body.link || !req.body.email || !req.body.categoryId) {
    return res.json({
      success: false,
      message: "Bad Request",
    });
  }

  await axios
    .get(req.body.link)
    .then(async function (response) {
      if (response.status === 200) {
          const data = await responseToHtmlParser(response.data, req.body.link)

        await LinkStore.updateOne(
          { email: req.body.email, "categoryList._id": req.body.categoryId },
          { $push: { "categoryList.$.subcategory": data } }).then(()=>{
            return res.json({
              success: true,
              message: "Link Created Successfully",
            });
          }).catch((err) => {
              return res.json({
                success: false,
                message: "Failed to Fetch Link",
              });
          }
        );
      } else {
        return res.json({
          success: false,
          message: "Failed to Fetch Link",
        });
      }
    })
    .catch((err) => {
      return res.json({
        success: false,
        message: "Failed to Fetch Link",
      });
    });
};

const updateCategoryName = async (req,res,next) =>{
  if (!req.body.categoryId || !req.body.email || !req.body.updatedName) {
    return res.json({
      success: false,
      message: "Bad Request",
    });
  }

  console.log(req.body.categoryId);

  await LinkStore.updateOne({email: req.body.email, "categoryList._id":req.body.categoryId},{$set:{"categoryList.$.categoryName":req.body.updatedName}}).then((updatedResult)=>{
    return res.json({
      success: true,
      message: "Category Name Updated",
    });
  }).catch((err)=>{
      return res.json({
        success: false,
        message: "Failed to Update Category Name",
      });
  
  });

};

const updateSubcategoryLink = async (req,res,next) =>{
  if (!req.body.categoryId || !req.body.email || !req.body.subcategoryId || !req.body.subcategoryLink) {
    return res.json({
      success: false,
      message: "Bad Request",
    });
  }
  await axios
    .get(req.body.subcategoryLink)
    .then(async function (response) {
      if (response.status === 200) {
          const data = await responseToHtmlParser(response.data, req.body.subcategoryLink)

        await LinkStore.updateOne(
          { email: req.body.email, "categoryList._id": req.body.categoryId, "categoryList.$.subcategory._id":req.body.subcategoryId},
          { $set: { "categoryList.$[outer].subcategory.$[inner].title": data.title,"categoryList.$[outer].subcategory.$[inner].iconUrl": data.iconUrl, "categoryList.$[outer].subcategory.$[inner].hostUrl": data.hostUrl, "categoryList.$[outer].subcategory.$[inner].link": data.link } },{
            arrayFilters: [
              { "outer._id": req.body.categoryId},
              {"inner._id": req.body.subcategoryId}
          ]
          }).then((updatedResult)=>{
            return res.json({
              success: true,
              message: "Link Updated Successfully",
            });
          }).catch((err) => {
            console.log(err)
              return res.json({
                success: false,
                message: "Failed to Update Link",
              });            
          }
        );
      } else {
        return res.json({
          success: false,
          message: "Failed to Update Link",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      return res.json({
        success: false,
        message: "Failed to Fetch Link",
      });
    });


};

const deleteCategory = async (req,res,next) =>{
  if (!req.body.categoryId || !req.body.email) {
    return res.json({
      success: false,
      message: "Bad Request",
    });
  }

  await LinkStore.updateOne({email: req.body.email, "categoryList._id":req.body.categoryId}, {$pull:{"categoryList":{_id:req.body.categoryId}}}).then((updatedResult)=>{
    return res.json({
      success: true,
      message: "Category Deleted",
    });
  }).catch((err)=>{
      return res.json({
        success: false,
        message: "Failed to Delete Category",
      });
  
  });

};

const deleteSubcategoryLink = async (req,res,next) =>{
  if (!req.body.categoryId || !req.body.email || !req.body.subcategoryId) {
    return res.json({
      success: false,
      message: "Bad Request",
    });
  }
        await LinkStore.updateOne(
           {email: req.body.email, "categoryList._id": req.body.categoryId}, {$pull:{"categoryList.$.subcategory":{_id:req.body.subcategoryId}}}).then((updatedResult)=>{
            return res.json({
              success: true,
              message: "Link Delete Successfully",
            });
          }).catch((err) => {
              return res.json({
                success: false,
                message: "Failed to Delete Link",
              });            
          }
        );
};

function responseToHtmlParser(response, link){
  const $ = cheerio.load(response);
  let hostUrl = '';
  try{
    hostUrl = new URL(link).host;
  }catch{

  }
        const data = {
          title: $("title") ? $("title").text() : "",
          iconUrl: "",
          link,
          hostUrl
        };
        console.log(data);

        const head = $("head");
        if (head.children().length) {
          for (let item of head.children()) {
            if (item.name === "link" && item.attribs.rel.includes("icon")) {
              data.iconUrl = item.attribs.href;
              break;
            }
          }
        }

        return data;
}

const getSettings = async (req,res,next) => {
  if(!req.query.id){
    return res.json({
      success: false,
      message: "Bad Request"
    });
  }

  LinkStore.findOne({_id: req.query.id}).then((data)=>{
    return res.json({
      success: true,
      response:{
        isTitleAvailable: data.isTitleAvailable,
        title: data.title,
        isShareable: data.isShareable,
        isPasswordProtected: data.isPasswordProtected,
        password: data.password,
        shareLink: data.shareLink
      }
    })
  }).catch((err)=>{
    return res.json({
      success: false,
      message: "Failed to Fetch Settings"
    })
  })

}

const updateSettings = async (req,res,next) => {
  if(!req.query.id){
    return res.json({
      success: false,
      message: "Bad Request"
    });
  }
  console.log(req.body)
  LinkStore.updateOne({_id: req.query.id},{$set:{isTitleAvailable:req.body.isTitleAvailable,title:(req.body.isTitleAvailable)?(req.body.title):'',isPasswordProtected: req.body.isPasswordProtected, isShareable: req.body.isShareable, password:(req.body.isPasswordProtected)?(req.body.password):'', shareLink: (req.body.isShareable)?(req.body.shareLink):''}}).then((data)=>{
    return res.json({
      success: true,
      message: "Link Settings Updated!"
    })
  }).catch((err)=>{
    return res.json({
      success: false,
      message: "Failed to Update Settings"
    })
  })
}

const getAllLinksForVisitors = async (req,res,next)=>{
  if (!req.query.visitor) {
    return res.json({
      success: false,
      message: "Bad Request"
    });
  }

  LinkStore.findOne({_id: req.query.visitor}).then((data)=>{
    const rawData = {
      id: data._id,
      isTitleAvailable: data.isTitleAvailable,
      title: data.title,
      isPasswordProtected: data.isPasswordProtected,
      isShareable: data.isShareable,
      password: data.password,
      shareLink: data.shareLink,
      categoryList:data.categoryList
    }
    return res.json({
      success: true,
      response:cryptoService.encryptJson(rawData)
    })
  }).catch((err)=>{
    return res.json({
      success: false,
      message: "Failed to Fetch Links"
    })
  })
}

module.exports = {
  getAllLinks,
  createCategory,
  createSubcategory,
  updateCategoryName,
  updateSubcategoryLink,
  deleteCategory,
  deleteSubcategoryLink,
  getSettings,
  updateSettings,
  getAllLinksForVisitors
};
