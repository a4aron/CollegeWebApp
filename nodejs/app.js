const express=require('express')
const mongoose=require('mongoose')
const port=process.env.port||3000;
////require for routes
var dbConn=require('./Config_files/dbconfig')
var indexRouter = require('./routes/index');
var catalogRouter = require('./routes/catalog');
var kitchenRoutes=require('./routes/kitchenRoute')
const app=express()

mongoose
  //.connect("mongodb://localhost:27017/YourDbName")//for local
   .connect(dbConn.dataURL)
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });



//const router=express.Router();
app.use(express.json())
app.use(express.urlencoded({extended:true}))



app.use("/api/kitchen",kitchenRoutes)
app.listen(port,()=>console.log("Listening at port..."+port))