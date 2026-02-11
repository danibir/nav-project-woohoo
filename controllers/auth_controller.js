const User = require("../models/User.js");

const jwt = require("jsonwebtoken")

const maxValidDate = 24*60*60

const signJWt = (id)=>{
    return jwt.sign({id}, process.env.secret, {
        expiresIn:maxValidDate
    })
}
const sign_in_render = (req, res) => {
  try {
    res.render("auth/login");
  } catch (err) {
    res.status(500).send({ err });
  }
};

const sign_in = async(req,res)=>{
    const {username, passwd, key} = req.body
    try{
    if(key === process.env.authKey){
    console.log("Key matched")
    const userId = await User.login(username,passwd);
    const token = signJWt(userId)
    res.cookie("jwt", token, {httpOnly: true, maxAge: maxValidDate *1000})
    res.status(200).json({success:true});
    }else{
    throw Error("The Provided Key Is Not Right");
    }
    }catch(err){
    console.log(err)
    res.status(301).json({err: err.message});
    }
}

const sign_up_render = (req,res)=>{
    try{
        res.render("auth/register")
    }catch(err){
        console.log(err)
        res.status(500).send({err})
    }
}

const sign_up = async(req,res)=>{
    const {username, passwd, key} = req.body
    try{
    if(key === process.env.authKey){
    const userId = await User.register(username,passwd)
    const token = signJWt(userId)
    res.cookie("jwt", token, {httpOnly: true, maxAge: maxValidDate *1000})
    res.status(200).json({success:true})
    }else{
        throw Error("The Provided Key Is Not Right")
    }
    }catch(err){
        console.log(err)
        res.status(301).json({err: err.message})
    }
}

module.exports = {
    sign_in_render,
    sign_in,
    sign_up_render,
    sign_up
};
