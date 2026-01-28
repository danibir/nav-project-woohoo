const jwt = require("jsonwebtoken")

const auth = async(req,res, next)=>{
    const token = req.cookies.jwt
    if(token){
        await jwt.verify(token, process.env.secret, (err, decodedToken)=>{
            if(err){
                res.redirect("/sign-in")
            }else{
                console.log("Token Decoded")
                next()
            }
        })
    }else{
        res.redirect("/sign-in")
    }
}

module.exports = {auth}