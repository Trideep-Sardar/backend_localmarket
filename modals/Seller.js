const mongoose=require('mongoose');
const {Schema}=require('mongoose');

const SellerSchema=new Schema({
    "user":{
        type:mongoose.Schema.Types.ObjectId,     //this will act as foreign key which is user id key for user model
        ref:"user"
    },
    "product_name":{
        type:String,
        required:true
    },
    "product_desc":{
        type:String,
        require:true
    },
    "price":{
        type:Number,
        required:true
    },
    "img":{
        type:String,
        required:true,
        default:"image not available"
    },
    "date":{
        type:Date,
        required:true,
        default:Date.now
    }
})

const Seller=mongoose.model('seller',SellerSchema);
module.exports=Seller;