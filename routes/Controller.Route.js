const { Router } = require('express');
const { getBooks, addBooks, deleteBook, updateBook,getOne, getAuthor, addAuthor, deleteAuthor, updateAuthor, searchBooks } = require('../controller/Controller');
const { isAuth } = require('../controller/AuthController');
const router = Router();

router.get('/books',getBooks);
router.post('/book',isAuth,addBooks);
router.delete('/book/:id',isAuth,deleteBook);
router.put('/book/:id',isAuth,updateBook)
router.get('/book/:id',getOne);
router.get('/author',getAuthor);
router.post('/author',isAuth,addAuthor);
router.delete('/author/:id',isAuth,deleteAuthor);
router.put('/author/:id',isAuth,updateAuthor);
router.post('/books/search',searchBooks)

module.exports = router;