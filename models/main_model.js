const mongoose = require("mongoose")
const Schema = mongoose.Schema

const dataSchema = new Schema({
  title: {
    type: Object,
    required: true
  },
  url: {
    type: String,
    required: true
  }
});

const navData = mongoose.model("navDatas", dataSchema, "navdata")

module.exports = navData