var express = require('express');
var router = express.Router();


const kitchenController=require("../Controllers/KitchenController");

router.get('/',kitchenController.menu_list);
router.get('/:id',kitchenController.menu_by_id)
router.post("/",kitchenController.saveMenu)
router.delete('/:id',kitchenController.delete)
router.put('/:id',kitchenController.updateMenu)
module.exports=router;