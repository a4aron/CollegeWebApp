
const MenuModel = require('../Models/MenuModel');

// Display list of all Genre.
module.exports.menu_list = function(req, res) {
    MenuModel.find({},(err,result)=>{
        if(err)throw err;
        else{
            return res.status(200).json(result)
        }
    })
};


// Display list of Genre by Id.
module.exports.menu_by_id = function(req, res) {
    
    MenuModel.findById(req.params.id,(err,menu)=>{
        if(err){
            res.status(400).json("Not found")
        }
        else{
            if(menu==null){
                return res.status(404).json("Not found")
            }
            return res.status(200).json(menu)
        }
    })
};




module.exports.saveMenu=function(req,res,next){

    var menuItem=new MenuModel({
        date:req.body.date,
        menuDayName:req.body.menuDayName,
        created_by_id:"1122",
        created_by_userName:"peshal",
        created_on:Date.now(),
        updated_on:null,
        items:req.body.items
    });
    menuItem.save(function (err, menuResponse) {
        if (err) return console.error(err);
        else{
            res.status(200).json(menuResponse)
        }
      });   

    }


module.exports.delete=function(req,res,next){
    MenuModel.findByIdAndRemove(req.params.id,(err,result)=>{
        if(err){
            res.status(400).json("Not found")
        }else{
            res.status(200).json({
                "message":"succesfully deleted",
                "menu Deleted":result
            })
        }
    })
}

module.exports.updateMenu=function(req,res,next){

    var menuItem=new MenuModel({
        date:req.body.date,
        menuDayName:req.body.menuDayName,
        created_by_id:"1122",
        created_by_userName:"peshal",
        created_on:Date.now(),
        updated_on:Date.now(),
        items:req.body.items
    });
    var query = {'_id':req.params.id};
    req.newData.date = req.user.date;
    req.newData.items=req.body.items;
    req.newData.menuDayName=req.body.menuDayName;
    MyModel.findOneAndUpdate(query, req.newData, {upsert:false,multi:false}, function(err, doc){
        if (err) return res.send(500, { error: err });
        return res.send("succesfully saved");
    }); 

    }



