const mongoose = require("mongoose")
const Schema = mongoose.Schema

const dataSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  }
});

const navData = mongoose.model("navDatas", dataSchema)

module.exports = navData