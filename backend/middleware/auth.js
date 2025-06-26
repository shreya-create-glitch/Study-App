const jwt=require('jsonwebtoken');

const verifyToken=async(req,res,next)=>{
    let token=req.headers['authorization']
    if(token){
        token=token.split(" ")[1]
        jwt.verify(token,process.env.SECRET,(err,decoded)=>{
            if(err){
                return res.json("Invalid Token")
            }
            else{
                req.user=decoded
            }
        })
        next()
    }
    else{
return res.json("Invalid Token")

    }
}
module.exports=verifyToken;