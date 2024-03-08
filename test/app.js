const express = require('express')
const path = require('path')
const app = express()
const port = 3000

app.get('/', function (req, res) {
  //console.log(req);
  // res.send('Hello World');
  // 클라이언트 웹브라우저에 보낸다
  // const headers = req.headers;
  // res.send(headers);
  res.json({message:"hello node!"});
})

app.get('/contacts', (req, res)=>{
  // const query = req.query;
  // res.status(200).send(query)
  const fullpath = path.join(__dirname, 'data', 'example.txt');
  console.log(fullpath);
  res.sendFile(fullpath);
})

app.get('/contacts/:id', (req,res)=>{
  res.status(200).send('contacts page')
})

app.post('/contacts/:id', (req,res)=>{
  res.status(201).send('create contacts')
})

// contacts/ 뒷부분은 값이다.
app.delete('/contacts/:id', (req,res)=>{
  console.log(req.params.id);
  res.status(200).send(`Delete Contact for Id : ${req.params.id}`);
})

app.listen(port, ()=>{
  console.log(`${port}번 포트에서 서버 실행 중`);
})

