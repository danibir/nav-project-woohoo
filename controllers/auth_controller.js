const User = require("../models/User.js");

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
    res.status(200).json({success:true});
    }else{
    throw Error("The Provided Key Is Not Right");
    }
    }catch(err){
    console.log(err)
    res.status(301).json({err: err.message});
    }
}

module.exports = {
    sign_in_render,
    sign_in
};
