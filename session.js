const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
require("dotenv").config();
const app = express();
const port = 3000


//미들웨어 등록
//key value 객체로 넣어줌
app.use(session({
  secret:"secret code",
  resave:false,
  saveUninitialized:true,
  store:MongoStore.create({mongoUrl:process.env.DB_LOCAL_URL}),
  //1밀리초 단위
  cookie:{maxAge:1000*60*60*24},

}));


app.get("/",(req,res)=>{
  if(req.session.count){
    req.session.count++;
    res.send(`${req.session.count}번째 방문입니다.`)
  } else{
    //처음 접속한 경우
    req.session.count = 1;
    res.send('첫번째 방문입니다.')
  }
})

app.get("/session", (req,res)=>{
  res.send(req.session.cookie)
})


// app.get("/cookie", (req,res)=>{
//   console.log(req.cookies.kim);
// });

app.get("/delete-session", (req,res)=>{
  req.session.destroy((err)=>{
    //서버 쪽 세션 정보 삭제하기
    if(err){
      console.log(err)
    }else{
      res.clearCookie("connect.sid");
      //클라이언트 쪽 세션 정보 삭제하기
      res.send("세션 삭제");
    }
  });
  

})


app.listen(port,() => {
  console.log("서버 시작!")
});