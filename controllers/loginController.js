const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;



// @desc Get Login page
// @route GET /
const getLogin = (req,res) => {
  res.render("home");
  //home.ejs 파일을 화면에 렌더링
}

// @desc Get Login page
// @route POST /
const loginUser = asyncHandler(async(req,res) => {
  // console.log(req.body);
  const {username,password} = req.body;
  const user = await User.findOne({username})
  if(!user){
    return res.status(401).json({message:"일치하는 사용자가 없습니다."})
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if(!isMatch){
    return res.status(401).json({message:"비밀번호가 일치하지 않습니다."})
  }
  //토큰 생성
  const token = jwt.sign({id:user._id},jwtSecret)
  res.cookie("token",token, {httpOnly:true})
  res.redirect("/contacts")
});

// @desc Get Register page
// @route GET /register
const getRegister =  (req,res) => {
  res.render("register");
}

// @desc Get Register user
// @route GET /register
const registerUser =  asyncHandler(async(req,res) => {
  const {username,password,password2} = req.body;
  if(password === password2){
    const hashedPassword = await bcrypt.hash(password,10);
    const user = await User.create({username,password:hashedPassword});
    res.status(201).json({message:"등록성공", user})
  }else{
    res.send("register failed")
  }
});


// @desc logout
// @route get /logout
const logout = (req,res)=>{
  //쿠키값을 지워준다
  res.clearCookie("token");
  res.redirect('/')
}


module.exports = {
  getLogin,
  loginUser,
  getRegister,
  registerUser,
  logout};