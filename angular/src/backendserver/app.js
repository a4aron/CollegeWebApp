const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const mongodburl = require ('./config')
var cors = require('cors')
const newsRoutes = require('./routes/news')
const userRoutes = require('./routes/user')
const menuRoutes=require('./routes/menu')
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});
app.use("/images", express.static(path.join("backendserver/images")));

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
app.use("/api/user",userRoutes);
app.use("/api",menuRoutes)
module.exports = app;
