const { Schema, model } = require("mongoose");
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

const navData = model("navDatas", dataSchema);

module.exports = navData