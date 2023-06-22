const mongoose=require('mongoose');



const nobatscema=new mongoose.Schema({
  saat:{
    type:String,
    required:true,
    trim:true,
  },
  date:{
    type:String,
    required:true,
    trim:true,
  },
  status:{
    type:Number,
    required:true,
    default: 1,
    enum: [1, 2,3],
  },
  

})


module.exports = mongoose.model("Nobat",nobatscema);