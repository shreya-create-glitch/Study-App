const express=require('express');
const { addBook, getAllBook, getById, editBook, deleteBook } = require('../controllers/book');
const verifyToken = require('../middleware/auth');
const router=express.Router();
router.get("/",getAllBook);
router.get("/:id",getById)
router.post("/",verifyToken,addBook);
router.put("/:id",editBook);
router.delete("/:id",deleteBook)
module.exports=router;