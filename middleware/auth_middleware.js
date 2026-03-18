const jwt = require("jsonwebtoken")
const mid = require('./main_middleware')

//JWT token verification
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

const authCheck = (req, res, next) => {
    const token = req.cookies.jwt
    
    if (!!token)
    {
        mid.addNavItems('authed')(req, res, () => {})
    }

    next()
}

module.exports = {
    auth,
    authCheck
}