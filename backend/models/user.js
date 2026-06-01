const mongoose=require('mongoose');
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        
    },
    email:{
        type:String,
        required:true,
    },
    password:{
       type:String,
        required:true,
    },
    coverImage:{
       type:String, 
    },
    targetRole: {
    type: String,
    default: "SDE",
  },

  topics: {
    type: [String], // ["DSA", "DBMS", "Web Dev"]
    default: ["DSA"],
  },
})
module.exports = mongoose.model('user', userSchema);
