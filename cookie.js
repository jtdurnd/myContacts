const express = require('express');
const cookieParser = require("cookie-parser")

const app = express();
const port = 3000
app.use(cookieParser());

app.get("/",(req,res)=>{
  res.cookie("kim", "1234", {httpOnly:true})
  //http 프로토콜을 통해서만 생성
  res.send("쿠키 생성");

})


app.get("/cookie", (req,res)=>{
  console.log(req.cookies.kim);
});

//url 마지막에서 /delete-cookie 붙이고 console에 출력되는지 확인
app.get("/delete-cookie", (req,res)=>{
  res.clearCookie("kim")
  res.send("쿠키삭제")
})

app.listen(port,() => {
  console.log("서버 시작!")
});