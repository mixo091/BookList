const mongoose = require('mongoose');

//Essentially Creating a Schema..
const BookSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    pages:{
        type:Number,
        required:true,
    },
    author:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:false,
    },
});

const BookModel = mongoose.model('books' , BookSchema);

module.exports = BookModel;