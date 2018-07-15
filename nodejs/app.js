const express=require('express')
const mongoose=require('mongoose')
const port=process.env.port||3000;
////require for routes
var indexRouter = require('./routes/index');
var catalogRouter = require('./routes/catalog');
var kitchenRoutes=require('./routes/kitchenRoute')
const app=express()

mongoose
  .connect("mongodb://localhost:27017/mumApp")
  // .connect("mongodb://dbadmin:mongo@12@ds018258.mlab.com:18258/instanonymous")
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
//app.use('/catalog', catalogRouter); 
app.listen(port,()=>console.log("Listening at port..."+port))