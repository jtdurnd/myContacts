const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username:{
    type:String,
    required:true,
    //필수 속성으로 설정
    unique:true,
    // 중복할 수 없도록 설정
  },
  password:{
    type:String,
    required:true,
  }

});
// 모델명 단수로 쓴다.

module.exports = mongoose.model("User", UserSchema);
//User라는 데이터베이스 이름 지정, 컬랙션은 users로 자동 생성.
