const express = require('express');
const multer = require('multer');

const News = require('../models/news');
const check_Auth = require('../middleware/check-auth')

const router = express.Router();
const MIME_TYPE_MAP = {
    'image/png' : 'png',
    'image/jpeg' : 'jpg',
    'image/jpg' : 'jpg'
}

const storage = multer.diskStorage({
    destination: (req, file, callback)=>{
        const isValid = MIME_TYPE_MAP[file.mimetype];
        let error = new Error("Invalid type");
        if(isValid){
            error = null;
        }
        callback(null, "backendserver/images");
    },
    filename: (req, file, callback)=>{
       const name = file.originalname.toLowerCase().split(' ').join('-');
       const ext = MIME_TYPE_MAP[file.mimetype];
       callback(null, name + '-'+ Date.now() + '.' + ext);
    }
});

//POST Request
router.post("", check_Auth, multer({storage: storage}).single("image") , (req, res, next) => {
    const url = req.protocol +  '://' + req.get("host");
    const news = new News({
        category: req.body.category,
        content: req.body.content,
        imagePath: url + "/images/" + req.file.filename,
        creator: req.userData.userId
    })
    news.save().then(createdNews => {
        res.status(201).json({
        message: "News added Successfully",
        news:{
            id: createdNews._id,
            category: createdNews.category,
            content: createdNews.content,
            imagePath: createdNews.imagePath,
            creator: req.userData.userId
        }
        })
    })
})

//GET Request
router.get('', (req, res, next) => {
    News.find().then((mynews) => {
        res.status(200).json({
            message: 'News Fetched',
            news: mynews
        })

    });
});
//DELETE Request
// also check if creator is the user id who created post
router.delete("/:id", check_Auth, (req, res, next) => {
    News.deleteOne({ _id: req.params.id, creator: req.userData.userId }).then(result => {
      console.log(result);
      //n is the property of results that gives how many document were updated
      if (result.n > 0) {
        res.status(200).json({ message: "News Deleted!" });
      } else {
        res.status(401).json({ message: "Not authorized!" });
      }
    })
})

//UPDATE Request
router.put("/:id", check_Auth, multer({storage: storage}).single("image") ,(req, res, next)=>{
    let imagePath = req.body.imagePath;
    if(req.file){
        const url = req.protocol +  '://' + req.get("host");
        imagePath = url + "/images/" + req.file.filename
    }
    const news = new News({
        _id : req.body.id,
        category: req.body.category,
        content : req.body.content,
        imagePath: imagePath,
        creator: req.userData.userId
    })
    // also check if creator is the user id who created post
    News.updateOne({_id: req.params.id, creator: req.userData.userId}, news).then(result => {
      //nModified is the property of results that gives how many document were updated
      if (result.nModified > 0) {
        res.status(200).json({ message: "Update successful!" });
      } else {
        res.status(401).json({ message: "Not authorized!" });
      }
    })
})
//GET according to id
router.get('/:id', (req,res,next) => {
    News.findById(req.params.id).then(news => {
        if(news){
            res.status(200).json(news);
        }else{
            res.status(404).json({message : "News not found"});
        }
    });
});

module.exports = router;
