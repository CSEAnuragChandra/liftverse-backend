//rolecheck middleware
const roleCheck = (...allowedRoles) =>{
return (req,res,next)=>{
    if(!allowedRoles.includes(req.user.role)){
        res.status(403).json({message:"forbidden Access Denied"})
    }
    next()
}
}

export default roleCheck