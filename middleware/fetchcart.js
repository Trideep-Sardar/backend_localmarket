const jwt = require('jsonwebtoken');
const SECRET_SIGN='USER_GET_AUTH'; 

const fetchcart=(req,res,next)=>{
    const token=req.header('auth-token');   //getting token from header list 
    // console.log(token);
    if(!token){
        res.status(401).json({error:"please authenticate with a valid token"});
    }
    try {
        const data=jwt.verify(token,SECRET_SIGN);    //verifying token with our secret signature and also getting the user id 
        // console.log(data);
        req.user=data;     //storing the user in request so that we can access it later
        next();
    } catch (error) {
        res.status(401).json({error:"please authenticate with a valid token"});
    }
}


module.exports=fetchcart;