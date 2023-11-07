const mongoose=require("mongoose");
const groupSchema = new mongoose.Schema({
    groupName: {
      type: String,
      required: true,
    },
    groupMembers:Array,
  });
  
  module.exports = mongoose.model("groups", groupSchema);