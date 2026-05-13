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
    required: true
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
    if(user) {
        if(await argon2.verify(user.passwd, passwd)) {
            return {success: true, result: user._id}
        }
        return Error({success: false, result: "Incredentials do not match."})
    }
    return Error({success: false, result: "Incredentials do not match."})
}

const User = model("Users", userSchema)

module.exports = User