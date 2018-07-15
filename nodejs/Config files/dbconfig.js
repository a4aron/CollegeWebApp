const mongoose=require('mongoose')

mongoose.connect('mongodb://localhost/mumApp');
module.exports.db=mongoose.connection;