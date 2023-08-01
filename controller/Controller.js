const jwt = require('jsonwebtoken');
const Books = require('../database/BookSchema');
const Author = require('../database/AuthorSchema')
const { v4:uuid } = require('uuid');

const getBooks = async(req,res) => {
try {
    const data = await Books.find();
    res.status(200).json(data)
} catch (error) {
    res.status(500).json(error.message)
}
}

const addBooks = async(req,res) => {
    try {
        const data = await Books.find()
        const { title,pages,year,price,country,author,descr } = req.body;
        const { image } = req.files;
        const id = parseInt(data[data.length - 1]?.id || 0) + 1;
        const newImage = `${uuid()}.${
            image.name.split(".")[image.name.split(".").length - 1]
          }`;
        
        const newBook = await Books.create({
            id,
            image:newImage,
            title,
            pages,
            year,
            price,
            country,
            author,
            descr
    })
        image.mv(process.cwd() + `/uploads/${newImage}`);
        res.status(201).json({message:'created'});
    } catch (error) {
        res.status(500).json(error.message)
    }
}

const deleteBook = async(req,res) => {
    try {
        const { id } = req.params
        const data = await Books.findByIdAndDelete(id)
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json(error.message)
    }
}

const updateBook = async(req,res) => {
    try {
        const data = await Books.find()
        const { title,pages,year,price,country,author,descr } = req.body;
        const { image } = req.files;
        const { id } = req.params;
        const newImage = `${uuid()}.${
            image.name.split(".")[image.name.split(".").length - 1]
          }`;
        const userid = data[id - 1];
        const update = await Books.findByIdAndUpdate(id,{
            image:image ? newImage : userid.image,
            title:title ? title : userid.title,
            pages:pages ? pages : userid.pages,
            year:year ? year : userid.year,
            price:price ? price : userid.price,
            country:country ? country : userid.country,
            author:author ? author : userid.author,
            descr:descr ? descr : userid.descr,
            id:userid.id
        })
        image.mv(process.cwd() + `/uploads/${newImage}`);
        res.status(200).json({message:'succes',update})
    } catch (error) {
       res.status(500).json(error.message) 
    }
}

const getOne = async(req,res) =>{
    try {
       const { id } = req.params;
       const findOne = await Books.findById(id);
       res.status(200).json(findOne)
    } catch (error) {
        res.status(500).json(error.message)
    }
}

const getAuthor = async(req,res) => {
    try {
        const data = await Author.find();
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json(error.message)
    }
    }
    
    const addAuthor = async(req,res) => {
        try {
            const data = await Author.find()
            const { name,lastname,birthday,dead,country,bio } = req.body;
            const { image } = req.files;
            const id = parseInt(data[data.length - 1]?.id || 0) + 1;
            const newImage = `${uuid()}.${
                image.name.split(".")[image.name.split(".").length - 1]
              }`;
            
            const newAuthor = await Author.create({
                id,
                image:newImage,
                name,
                lastname,
                birthday,
                dead,
                country,
                bio
        })
            image.mv(process.cwd() + `/uploads/${newImage}`);
            res.status(201).json({message:'created',newAuthor});
        } catch (error) {
            res.status(500).json(error.message)
        }
    }
    
    const deleteAuthor = async(req,res) => {
        try {
            const { id } = req.params
            const data = await Author.findByIdAndDelete(id)
            res.status(200).json(data)
        } catch (error) {
            res.status(500).json(error.message)
        }
    }
    
    const updateAuthor = async(req,res) => {
        try {
            const data = await Books.find()
            const { name,lastname,birthday,dead,country,bio } = req.body;
            const { image } = req.files;
            const { id } = req.params;
            const newImage = `${uuid()}.${
                image.name.split(".")[image.name.split(".").length - 1]
              }`;
            const userid = data[id - 1];
            const update = await Author.findByIdAndUpdate(id,{
                image:image ? newImage : userid.image,
                name:name ? name : userid.name,
                lastname:lastname ? lastname : userid.lastname,
                dead:dead ? dead : userid.dead,
                birthday:birthday ? birthday : userid.birthday,
                country:country ? country : userid.country,
                bio:bio ? bio : userid.bio,
                id:userid.id
            })
            image.mv(process.cwd() + `/uploads/${newImage}`);
            res.status(200).json({message:'succes',update})
        } catch (error) {
           res.status(500).json(error.message) 
        }
    }
    
const searchBooks = async(req,res) => {
    try {
    const { title } = req.body;
    const data = await Books.find();
    const filterData = data.filter((el) => {
        return el.title == title
    }) 
    res.status(200).json(filterData)
    } catch (error) {
        res.status(500).json(error.message)
    }
}



module.exports = {
    getBooks,
    addBooks,
    deleteBook,
    updateBook,
    getOne,
    getAuthor,
    deleteAuthor,
    updateAuthor,
    addAuthor,
    searchBooks
}