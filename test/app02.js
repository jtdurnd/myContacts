//진입점이 되는 파일

const express = require('express');


const app = express();
// const router = express.Router();


const port = 3000


app.get("/", (req,res)=>{
  res.send("Hello node!")
})

//등록
app.use("/contacts", require('./contactRoutes'));

app.listen(port, ()=>{
  console.log('서버 시작!')
})