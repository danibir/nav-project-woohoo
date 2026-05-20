//Required Models
const User = require("../models/User.js")
const jwt = require("jsonwebtoken")

//Variables
const maxValidDate = 24*60*60

//Functions
const signJWt = (id) => {
    return jwt.sign({id}, process.env.secret, {
        expiresIn:maxValidDate
    })
}

//Controllers
const login_get = (req, res) => {
    res.locals.metatitle = "Logg inn"
    res.render("auth/login")
}


const login_post = async(req, res) => {
    const genericfail = "Brukernavn eller passord stemmer ikke."
    const {username, passwd} = req.body
    try {
        const userId = await User.login(username, passwd)
        if (!userId.success) {
            res.locals.error = genericfail
            return res.render('auth/login')
        }
        const token = signJWt(userId.result)
        res.cookie("admin", token, { httpOnly: true, maxAge: maxValidDate *1000 })
        res.status(200).redirect('/')
    } catch(err) {
        console.log(err)
        res.locals.error = "Noe gikk galt. Prøv igjen senere."
        return res.render('auth/login')
    }
}

const signup_get = (req, res) => {
    res.locals.metatitle = "Registrer"
    res.render("auth/register")
}

const signup_post = async(req,res) => {
    const {username, passwd, passwd2, key} = req.body
    try {
        if (passwd !== passwd2) {
            res.locals.error = "Passord stemmer ikke"
            return res.render('auth/register')
        }
        if (key !== process.env.authKey) {
            res.locals.error = "Ugyldig nøkkel."
            return res.render('auth/register')
        }
        const userExists = await User.exists({ name: username })
        if (userExists) {
            res.locals.error = "Brukernavn er allerede tatt."
            return res.render('auth/register')
        }
        const userId = await User.register(username,passwd)
        const token = signJWt(userId)
        res.cookie("admin", token, {httpOnly: true, maxAge: maxValidDate *1000})
        res.status(200).redirect('/')
            
    } catch(err) {
        console.log(err)
        res.locals.error = "Noe gikk galt. Prøv igjen senere."
        return res.render('auth/register')
    }
}

const log_out = (req, res) => {
    res.clearCookie('admin')
    res.redirect('/')
}

module.exports = {
    login_get,
    login_post,
    signup_get,
    signup_post,
    log_out
}
