const express = require('express');
const dbConnect = require("./config/dbconnect");
const methodOverride = require("method-override");


const app = express();
app.set("view engine", "ejs");
app.set("views", "./views");



//정적 파일 위치 지정
app.use(express.static("./public"));
app.use(methodOverride("_method"));


const port = 3000

dbConnect();

const requestTime = (req, res, next)=>{
  let today = new Date();
  let now = today.toLocaleTimeString();
  req.requestTime = now;
  next();
}

app.use(requestTime);

// app.get("/", (req,res)=>{
//   res.send('hello node!');
//   //send하면 종료된다.
// })

// json 데이터로 보여주기 위함 -> 안하면 undefined로 뜬다
app.use(express.json());

// 파싱(parsing) 과정 인코딩된 url을 파싱해주는 미들웨어 함수
app.use(express.urlencoded({extended:true}));

app.use("/", require("./routes/loginRoutes"));

// app.use("/register",require("./routes/loginRoutes"));

app.use("/contacts", require('./routes/contactRoutes'));

app.listen(port, ()=>{
  console.log('서버 시작!!!!!')
})