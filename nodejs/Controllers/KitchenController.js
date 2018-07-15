
const MenuModel = require('../Models/MenuModel');

// Display list of all Genre.
module.exports.menu_list = function(req, res) {
    res.status(200).json('NOT IMPLEMENTED: Menu list');
};

module.exports.days_list = function(req, res) {
    res.send('NOT IMPLEMENTED: Day list');
};

module.exports.saveMenu=function(req,res,next){

    var menuItem=new MenuModel({
        date:Date.now(),
        menuDayName:req.body.menuDayName,
        created_by_id:"1122",
        created_by_userName:"peshal",
        created_on:Date.now(),
        updated_on:null,
        items:[{session:"morning",menuList:"samosa,pakauda,kachauri"}]
    });
    console.log(menuItem)
    menuItem.save(function (err, menuResponse) {
        if (err) return console.error(err);
        else{
            res.status(200).json(menuResponse)
        }
      });   

    }

