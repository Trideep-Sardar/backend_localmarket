const express=require('express');
const User = require('../../modals/User');
const router=express.Router();
const {body,validationResult} =require('express-validator');
const jwt = require('jsonwebtoken');
const SECRET_SIGN='USER_GET_AUTH'; 
const bcrypt = require('bcrypt');

//--create user -------------
router.post('/createuser',[
    body('name','given name is too small').isLength({min:5}),
    body('email','enter a valid email').isEmail(),
    body('password','password is too small').isLength({min:5})
],async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let success=true;
    const{name,email,password}=req.body;
    try {
        let user=await User.findOne({email:email});
    
        if(user){
            success=false;
            res.json({error:"user with this email already present"});
        }else{
            const salt = bcrypt.genSaltSync(10);
            var hash = bcrypt.hashSync(password, salt);
            user=await User.create({
                name:name,
                email:email,
                password:hash
            })
            const data={
                id:user.id
            }
            const userToken=jwt.sign(data,SECRET_SIGN);
            res.json({success,userToken});
        }
    } catch (error) {
        res.status(500).json({error:error});
    }
})

// sign in user using user credentials

router.post('/login',[
    body('email','enter a valid email').isEmail(),
    body('password','password is too small').isLength({min:5})
],async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let success=true;
    const {email,password}=req.body;
    let user=await User.findOne({email:email});
    if(!user){
        success=false;
        res.json({message:"invalid credentials"});
    }else{
        const validate=bcrypt.compare(password,user.password);
        if(!validate){
            success=false;
            res.json({message:"invalid credentials"})
        }else{
            const data={
                id:user.id
            }
            const userToken=jwt.sign(data,SECRET_SIGN);
            res.json({success,userToken});
        }
    }
})



module.exports=router;