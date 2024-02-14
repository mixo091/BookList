const mongoose = require('mongoose');

const db = async () =>{
    try{
        mongoose.set('strictQuery' , false);
        await mongoose.connect(process.env.MONGO_URL)
        console.log('Database Succesfully Connected.');
    }catch(error){
        console.log('Database Connection Failed');
    }
    console.log('==================================');
}

module.exports = db;