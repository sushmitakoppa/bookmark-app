const express=require('express');
const app=express();
const books=require('./books');
const bookmark=require('./bookmark');
const mongoose=require('mongoose');

/* connection to database */
// mongoose.connect('mongodb://localhost:27017/loonity',{useNewUrlParser: true, useUnifiedTopology: true })
// .then(()=>{
//     console.log('connected to db')
// })
// .catch((err)=>{
//     console.log('Error',err.name)
// })

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
app.use(express.static('front-end'))
app.use('/users/books', books)
app.use('/users/bookmarks',bookmark)


const port=process.env.port||5000;

app.listen(port, ()=>console.log(`listening ${port}`))