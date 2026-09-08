
const jwt = require('jsonwebtoken')
const isSignIn=(req,res,next)=>{
try{
    const bareareToken = req.headers.authorization
    
 if(!bareareToken)throw new Error ('login requid ')

    const token = bareareToken.split(' ')[1];

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user=payload;
    next();

}catch(err){
res.status(401).json({err:"invalid token"})

}
}

module.exports=isSignIn;
    
