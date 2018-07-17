const mongoose = require('mongoose');

//creating schema
const newsSchema = mongoose.Schema({
    category : {type: String, required : true},
    content  : {type: String, required : true},
    imagePath :{type : String, required : true},
    creator : {type: mongoose.Schema.Types.ObjectId, ref: "User", required : true}
});

module.exports = mongoose.model('News', newsSchema);
