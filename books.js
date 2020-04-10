const express=require('express');
const router=express.Router();
// const Joi=require('joi');

const mongoose=require('mongoose');

/* connection to database */
mongoose.connect('mongodb://localhost:27017/loonity',{useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>{
    console.log('connected to db')
})
.catch((err)=>{
    console.log('Error',err.name)
})











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
// router.get('/',(req,res)=>{
//     res.send(book_list)
// })
router.get('/:title',(req,res)=>{
    const book_get=book_list.find(index=>index.title===req.params.title)
    if (!book_get){
        res.status(400).send(`There is no book named ${req.params.title}`)
    }
    else{
        res.send(book_get)
    }
})

/* UPDATE OF BOOKS */

  router.put('/put/:title',(req,res)=>{
    //   var id=parseInt(req.params.id);
      var updated_books={
          title:req.body.title,
          author:req.body.author
      };
const book_id=book_list.find(index=>index.title===req.params.title)
      if(!book_id){
          res.send(`no such title exists`)
    }
    else{
        book_id.title=updated_books.title;
        book_id.author=updated_books.author;

        res.send(`book updated ${book_list}`)
      }
  });
  
  




module.exports=router
