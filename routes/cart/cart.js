const express=require('express');
const router=express.Router();
const {body,validationResult} =require('express-validator');
const fetchcart = require('../../middleware/fetchcart');
const Cart = require('../../modals/Cart');

// const SECRET_SIGN='Cart_GET_AUTH'; 



// create products 

router.post('/createcart',[
    body('product_name','enter a valid name').isLength({min:3}),
    body('product_desc','enter a valid description').isLength({min:20})
],fetchcart,async(req,res)=>{
    const {product_name,product_desc,price,img}=req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
    
        let cart=await Cart.create({
            user:req.user.id,
            product_name:product_name,
            product_desc:product_desc,
            price:price,
            img:img
        })
        // res.send('working fine');
        res.json(cart);
        
    } catch (error) {
        res.json(error);
    }

})


 

//get Cart products
router.get('/getcart',fetchcart,async(req,res)=>{
    const cart=await Cart.find({user:req.user.id});
    res.json(cart);
})



//delete products

router.delete('/deletecart:id',fetchcart,async(req,res)=>{
    try {
        let cart=await Cart.findById(req.params.id);
        if(!cart){
            res.json({error:"not allowed"});
        }
        if(cart.user.toString()!==req.user.id){
            res.json({error:"not allowed"});
        }
        cart=await Cart.findByIdAndDelete(req.params.id);
        res.json(cart);
    } catch (error) {
        res.status(500).json({error:error});   
    }
})
module.exports=router;