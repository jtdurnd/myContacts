const mongoose = require("mongoose");
require('dotenv').config();
//--env-file -env 빼도 동작함

const dbConnect = async ()=>{
  try{
    const connect = await mongoose.connect(process.env.DB_LOCAL_URL);
    console.log('DB가 연결됨!!');
  }catch(err){
    console.log(err);
  }

}

module.exports = dbConnect;