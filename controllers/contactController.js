// router부분 contactRoutes에서 정의
// controller부분 여기서 정의

const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

// @desc Get all contacts
// @route Get /contacts
const getAllContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find();
  // res.status(200).render("getAll", {heading:"User List", contacts:contacts});
  res.render("index", {contacts:contacts})
})


// @desc view add contacts form
// @route Get /contacts/add
const addContactForm = (req, res) => {
  res.render("add");
}



// @desc Create a contact
// @route POST /contacts/add
const createContact = asyncHandler(async(req, res) => {
  // 새 연락처 추가하기  
  const {name,email,phone} = req.body;
  if (!name || !email || !phone){
    return res.status(400).send("필수값이 입력안됨")
  }
  await Contact.create({name,email,phone})

  //res.status(201).send("Create Contacts");

  res.redirect("/contacts");
})



// @desc get contact
// @route Get /contact/:id
const getContact = asyncHandler(async(req, res) => {
  // 연락처 상세보기
  const contact = await Contact.findById(req.params.id);
  // res.status(200).send(`View Contact for ID: ${req.params.id} \n ${contact}`);
  res.render("update", {contact:contact})
})



// @desc put contact
// @route PUT /contact/:id
const updateContact = asyncHandler(async(req, res) => {
  // 연락처 수정하기
  const id = req.params.id;
  const {name,email,phone} = req.body;
  // 수정할 부분 body에서 바꾸기
  const contact = await Contact.findById(id);
  if(!contact){
    res.status(404);
    throw new Error("연락처가 없습니다.");
  }
  contact.name = name
  contact.email = email
  contact.phone = phone
  contact.save()

  // res.status(200).send(`Update Contact for ID: ${req.params.id}`);

  res.redirect("/contacts");
})



// @desc delete contact
// @route DELETE /contact/:id
const deleteContact = asyncHandler(async(req, res) => {
  // 연락처 삭제하기
  const id = req.params.id; // id값 가져오기
  const contact = await Contact.findByIdAndDelete(id);

  // res.status(200).send(`Delete Contact for ID: ${req.params.id}`);

  res.redirect("/contacts");
})



//{}로 묶어서 exports
module.exports = {
  getAllContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact,
  addContactForm }