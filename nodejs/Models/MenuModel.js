var mongoose=require('mongoose')

var menuSchema=mongoose.Schema({
    date:{
        type:Date,
        required:true
    },
    menuDayName:{
        type:String,
        required:false
    },
    created_by_id:{
        type:String,
        required:true
    },
    created_by_userName:{
        type:String,
        required:true
    },
    created_on:{
        type:Date,
        required:true
    },updated_on
    :{
        type:Date,
        required:false
    },
    items: [{
        session: String,
        menuList: {
            type: String,
        }
    }]
});

module.exports=mongoose.model('MenuModel',menuSchema)

// ///get all menus
// module.exports.getMenuList=function(callback,limit){
//     MenuModel.find(callback).limit(limit)
// }

// ///get menu by id
// module.exports.getMenuById=function(id,callback){
//     MenuModel.findById(id,callback);
// }

// //add menu
// module.exports.addMenu=function(menu,callback){
//     MenuModel.create(menu,callback)
// }