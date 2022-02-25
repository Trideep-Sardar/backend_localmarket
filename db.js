const mongoose=require('mongoose');
const ConnectToDb=()=>{mongoose.connect('mongodb://localhost:27017/ecommerce?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false',()=>{
    console.log('Connected to Mongodb successfully !!');
})}

module.exports=ConnectToDb;