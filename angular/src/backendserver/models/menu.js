var mongoose=require('mongoose')

var menuSchema=mongoose.Schema({
    // dayName:{
    //     type:String,
    //     required:true
    // },
    menuDayName:{
        type:String,
        required:false
    },
    // created_by_id:{
    //     type:String,
    //     required:true
    // },
    // created_by_userName:{
    //     type:String,
    //     required:true
    // },
    // created_on:{
    //     type:Date,
    //     required:true
    // },updated_on
    // :{
    //     type:Date,
    //     required:false
    // },
    items: [{
        session: String,
        menuList: {
            type: String,
        }
    }]
});

module.exports=mongoose.model('MenuModel',menuSchema)