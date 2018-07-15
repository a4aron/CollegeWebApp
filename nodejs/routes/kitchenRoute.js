var express = require('express');
var router = express.Router();


const kitchenController=require("../Controllers/KitchenController");

router.get('/',kitchenController.menu_list);

router.post("/saveMenu",kitchenController.saveMenu)

module.exports=router;