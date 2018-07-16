const express = require('express');
const mongoose = require('mongoose');
const mongodburl = require ('./config.js')
var cors = require('cors')
const router = express.Router();
const app = express();
const News = require('./models/news');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.set('x-powered-by', false);

mongoose
    .connect(mongodburl.mongodburl)
    .then(() => {
        console.log("Connected to database!");
    })
    .catch(() => {
        console.log("Connection failed!");
    });

// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*'); //no matter which domain the app is running on will allow to access the resources
//     res.setHeader(
//         "Access-Control-Allow-Headers",
//         "Origin, X-Requested-With, Content-Type, Accept");
//     res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST,PATCH, DELETE, OPTIONS');
//     next();
// });


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

app.use('/api', router);
module.exports = app;
