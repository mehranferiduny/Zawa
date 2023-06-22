const mongoose=require('mongoose');

const{schema}=require('./secret/yupuser')

const rezscema=new mongoose.Schema({
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
  fname:{
    type:String,
    required:true,
    minLength:2,
    maxLength:32,
    trim:true,
  },
  lname:{
    type:String,
    required:true,
    minLength:2,
    maxLength:32,
    trim:true,
  },
  number:{
    type:Number,
    required:true,
    trim:true,
  },
  nump:{
    type:Number,
    required:true,
    trim:true,
  },



})

rezscema.statics.userValidation = function (body) {
  return schema.validate(body, { abortEarly: false });
};
rezscema.index({ number: "text" });

module.exports = mongoose.model("Rezerv",rezscema);