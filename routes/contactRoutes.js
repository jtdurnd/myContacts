const express = require("express");
const {getAllContacts,createContact,getContact,updateContact,deleteContact,addContactForm} = require("../controllers/contactController");
const cookieParser = require("cookie-parser");
const checkLogin = require("../middlewares/checkLogin");
const router = express.Router();

router.use(cookieParser());

// 로그인이 확인이 되야만 다음 페이지로 넘어감.

router
  .route("/")
  // 모든 연락처 가져오기

  .get(checkLogin,getAllContacts)
  // next로 보냈기 때문에 getAllContacts 실행
  

router
  .route("/add")
  .get(checkLogin,addContactForm)
  .post(checkLogin,createContact);


router
  .route("/:id")
  .get(checkLogin,getContact)
  .put(checkLogin,updateContact)
  .delete(checkLogin,deleteContact);

  
module.exports = router;
