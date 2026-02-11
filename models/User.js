const { Schema, model } = require("mongoose");
const argon2 = require("argon2");

const userSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  passwd: {
    type: String,
    unique: true,
    required: true,
    minLength: 6,
  }
});

userSchema.pre("save", async function () {
    try{
        this.passwd = await argon2.hash(this.passwd)
    }catch(err){
        console.log(err)
    }
})
userSchema.statics.register = async(username, passwd)=>{
    const user = await new User({
        name: username,
        passwd: passwd
    })
    await user.save()
    return user._id
}

userSchema.statics.login = async(username, passwd)=>{
    const user = await User.findOne({name:username})
    if(user){
    if(await argon2.verify(user.passwd, passwd)){
        return user._id
    }
    throw Error("Provided Password is Wrong")
    }
    throw Error("User Not Found")
}

const User = model("Users", userSchema)

module.exports = User