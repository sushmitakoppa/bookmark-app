const express=require('express');
const app=express();
const Joi=require('joi');
// const Joi=require('@hapi/joi');        
// const helmet=require('helmet')

const bookmarks_list=[
    {id:1, url:'bm1', desc:'music', tags:'song'},
    {id:2, url:'bm2', desc:'', tags:''}
]

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

app.post('/users/bookmarks', (req,res)=>{
    const schema={
        url:Joi.string().min(3).required(),
        desc:Joi.string(),
        tags:Joi.string()
    }
    const result=Joi.validate(req.body, schema)
    if (result.error){
        // console.log('error')
        res.status(400).send(result.error);
        // .details[0].message
        return
    }
    console.log(result)
    // const schema=Joi.object({
    //     url: Joi.string(),
    //     desc:Joi.string(),
    //     tags: Joi.string()
    // })
    const bookmark={
        id:bookmarks_list.length+1,
        url:req.body.url,
        desc:req.body.desc,
        tags:req.body.tags
    }
//    schema.validate({url:'123'});

//    try{
//        const value=await schema.validateAsync({username: 'abc'});
//    }
//     catch (err){ }
    bookmarks_list.push(bookmark)
    res.send(bookmarks_list)
});

app.get('/users/bookmarks/:url', (req,res)=>{
    // res.send(bookmarks)
    // res.send(req.params.id)
    const bookmark_get=bookmarks_list.find(index=>index.url===req.params.url)
    if (!bookmark_get){
        res.status(400).send('invalid url')
    }
    // console.log(res.bookmarks)
    res.send(bookmark_get)
})

const port=process.env.port||5000;

app.listen(port, ()=>console.log(`listening ${port}`))