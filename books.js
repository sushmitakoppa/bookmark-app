const express=require('express');
const router=express.Router();
// const Joi=require('joi');
const book_list=[
    {
        id:1, title:"title1", author:"name 1"
    }
]

router.post('/', (req,res)=>{
    const book={
        id:book_list.length+1,
        title:req.body.title,
        author:req.body.author
    }
    book_list.push(book)
    res.send(book_list)
})

router.get('/:title',(req,res)=>{
    const book_get=book_list.find(index=>index.title===req.params.title)
    if (!book_get){
        res.status(400).send(`There is no book named ${req.params.title}`)
    }
    else{
        res.send(book_get)
    }
})





module.exports=router
