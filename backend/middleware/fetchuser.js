const jwt = require('jsonwebtoken');
const JWT_SECRET="harrybhai"

const fetchuser=(req,res,next)=>{
    const token=req.header('auth-token')
    if(!token){
        return res.status(400).send({error:'Please authenticate via valid token'})
    }
    const data=jwt.verify(token,JWT_SECRET)
     req.user=data.user
    next();
}

module.exports=fetchuser;