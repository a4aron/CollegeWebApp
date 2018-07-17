const express = require('express');
const multer = require('multer');

const News = require('../models/news');

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
router.post("/news", multer({storage: storage}).single("image") , (req, res, next) => {
    const url = req.protocol +  '://' + req.get("host");
    const news = new News({
        category: req.body.category,
        content: req.body.content,
        imagePath: url + "/images/" + req.file.filename
    })
    news.save().then(createdNews => {
        res.status(201).json({
        message: "News added Successfully",
        news:{
            id: createdNews._id,
            category: createdNews.category,
            content: createdNews.content,
            imagePath: createdNews.imagePath
        }
        })
    })
})

//GET Request
router.get('/news', (req, res, next) => {
    News.find().then((mynews) => {
        res.status(200).json({
            message: 'News Fetched',
            news: mynews
        })

    });
});
//DELETE Request
router.delete("/news/:id", (req, res, next) => {
    News.deleteOne({ _id: req.params.id }).then(result => console.log(result));
    res.status(200).json({ message: 'News Deleted' });
})

//UPDATE Request
router.put("/news/:id", multer({storage: storage}).single("image") ,(req, res, next)=>{
    let imagePath = req.body.imagePath;
    if(req.file){
        const url = req.protocol +  '://' + req.get("host");
        imagePath = url + "/images/" + req.file.filename
    }
    const news = new News({
        _id : req.body.id,
        category: req.body.category,
        content : req.body.content,
        imagePath: imagePath
    })
    News.updateOne({_id: req.params.id}, news).then(result => {
        res.status(200).json({message : 'Update successful'});
    })
})
//GET according to id
router.get('/news/:id', (req,res,next) => {
    News.findById(req.params.id).then(news => {
        if(news){
            res.status(200).json(news);
        }else{
            res.status(404).json({message : "News not found"});
        }
    });
});

module.exports = router;
