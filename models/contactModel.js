const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    name:{
      type:String,
      required:true,  
    },
    email:{
      type:String,

    },
    phone:{
      type:String,
      required:[true, "전화번호는 꼭 기입해 주세요"],
      // 지정하지 않았을때 에러 메시지 [] 안에
    },
  },
  {timestamps:true}
);

// 스키마 -> 모델
// mongoose.model(모델명, 스키마명)
const Contact = mongoose.model("Contact",contactSchema);

module.exports = Contact;





