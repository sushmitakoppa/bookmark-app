const express=require('express');
const app=express();
const Joi=require('joi');
const books=require('./books')
const bookmark=require('./bookmark')
// const Joi=require('@hapi/joi');        
// const helmet=require('helmet')

// console.log(bookmarks[0])

//mongoose validator
// var bookmarkSchema= new schema({
//     url: {
//         type: String,
//         maxlength: 50,

//     }
// })


app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/users/book', books)
app.use('/users/bookmarks',bookmark)


const port=process.env.port||5000;

app.listen(port, ()=>console.log(`listening ${port}`))