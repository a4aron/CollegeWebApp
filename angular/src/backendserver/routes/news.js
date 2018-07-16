const express = require('express');
const router = express.Router();
const News = require('../models/news');

//POST Request
router.post("/news", (req, res, next) => {
    const news = new News({
        category: req.body.category,
        content: req.body.content
    })
    news.save().then(createdNews => {
        res.status(201).json({
        message: "News added Successfully",
        newsId : createdNews._id
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

//Update Request
router.put("/news/:id",(req, res, next)=>{
    const news = new News({
        _id : req.body.id,
        category: req.body.category,
        content : req.body.content
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
