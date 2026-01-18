//authmiddleware

import jwt from 'jsonwebtoken'

const authMiddleware=(req,res,next)=>{
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if(authHeader&&authHeader.startsWith("Bearer")){
    let token = authHeader.split(" ")[1];
    if(!token){
        res.status(401).json({message:"no token"})
    }
    try {
        const decoded = jwt.verify(token,process.env.secret_key)
        req.user = decoded;
        next()
    }
    catch (err) {
        res.status(400).json("invalid token")
    }
    }
}
export default authMiddleware