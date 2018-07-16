const express = require('express');
const mongoose = require('mongoose');
const mongodburl = require ('./config.js')
var cors = require('cors')
const newsRoutes = require('./routes/news')
const app = express();


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

app.use("/api",newsRoutes);
module.exports = app;
