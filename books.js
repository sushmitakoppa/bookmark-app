const express=require('express');
const router=express.Router();
const Joi=require('joi');

const mongoose=require('mongoose');

/* connection to database */
// mongoose.connect('mongodb://localhost:27017/loonity',{useNewUrlParser: true, useUnifiedTopology: true })
// .then(()=>{
//     console.log('connected to db')
// })
// .catch((err)=>{
//     console.log('Error',err.name)
// })


function validateBooks(book){
    const schema={
        title:Joi.string().required(),
        author:Joi.string().required()
    }
    return Joi.validate(book, schema)
}


const books_list=[
    {id:1, title:"title1", author:"name 1"},
    {id:2, title:"title2", author:"name 2"}
]

/* GET */


// router.get('/',(req,res)=>{
//     res.send(books_list)
// })
router.get('/:title',(req,res)=>{
    const book_get=books_list.find(index=>index.title===req.params.title)
    if (!book_get){
        return res.status(400).send(`There is no book named ${req.params.title}`)
    }
    else{
        res.send(book_get)
    }
})

/* POST */

router.post('/', (req,res)=>{
    const book={
        id:books_list.length+1,
        title:req.body.title,
        author:req.body.author
    }
    const result=validateBooks(req.body)
    if(result.error){
        return res.status(404).send(result.error.details[0].message)
    }
    books_list.push(book)
    res.send(books_list)
})


/* UPDATE OF BOOKS */

router.put('/:title',(req,res)=>{
    //   var id=parseInt(req.params.id);
     
    const book_id=books_list.find(index=>index.title===req.params.title)
      if(!book_id){
          return res.status(400).send(`No such book exists named ${req.params.title}`)
    }
    const result=validateBooks(req.body)
    if (result.error){
        return res.status(400).send(result.error.details[0].message)
    }
    var updated_books={
        title:req.body.title,
        author:req.body.author
    };
    book_id.title=updated_books.title;
    book_id.author=updated_books.author;

    res.send(updated_books)
  });

/* DELETE */


router.delete('/:title',(req,res)=>{
    const book_delete=books_list.find(index=>index.title===req.params.title)
      
    if(!book_delete){
        return res.status(400).send(`No such book exists`)
  }
  const index=books_list.indexOf(book_delete);
  books_list.splice(index,1);

    res.send(`Deleted ${req.params.title}`)
})

  




module.exports=router
