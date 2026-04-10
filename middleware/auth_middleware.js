const jwt = require("jsonwebtoken")
const mid = require('./main_middleware')
const han = require('../handlers/helperware')

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
        return res.redirect("/sign-in")
    }
}

const authCheck = (req, res, next) => {
    const token = req.cookies.admin
    if (!!token)
    {
        mid.addNavItems('authed')(req, res, () => {})
    }
    next()
}

const authRestrain = (req, res, next) => {
    const token = req.cookies.admin
    if (!token) {
        return han.renderErrorPage(res, 404, "Page not found.")
    }
    next()
}

module.exports = {
    auth,
    authCheck,
    authRestrain
}