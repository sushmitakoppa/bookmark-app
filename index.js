const express=require('express');
const app=express()
// const helmet=require('helmet')

const bookmarks=[
    {id:1, url:'bm1', desc:'music', tags:'song'},
    {id:2, url:'bm2', desc:'', tags:''}
]

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.post('/users/bookmarks', (req,res)=>{
    const bm={
        id:bookmarks.length+1,
        url:req.body.url,
        desc:req.body.desc,
        tags:req.body.tags
    }
    
    bookmarks.push(bm)
    res.send(bm)
});

app.get('/users/bookmarks', (req,res)=>{
    res.send(bookmarks)
    // console.log(res.bookmarks)
})

const port=process.env.port||5000;

app.listen(port, ()=>console.log(`listening ${port}`))