const express=require('express');
const router =express.Router();
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

/* without mongo db************* */

const bookmarks_list=[
    {id:1, url:'bm1', desc:'music', tags:'song'},
    {id:2, url:'bm2', desc:'', tags:''}
]

function validateBookmark(bookmark){
    const schema={
        id:Joi.string(),
        url:Joi.string().min(3).required(),
        desc:Joi.string(),
        tags:Joi.string()
    }
    return Joi.validate(bookmark, schema)
}
/* CRUD operation */


router.get('/get/:url', (req,res)=>{
   
    const bookmark_get=bookmarks_list.find(index=>index.url===req.params.url)
    if (!bookmark_get){
        res.status(400).send(`There is no such url ${req.params.url}`)
    }
    else{
        res.send(bookmark_get)
    }
})

router.post('/post', (req,res)=>{

    const result=validateBookmark(req.body)
    if (result.error){
        return res.status(400).send(result.error.details[0].message);
        
    }
    // console.log(result)
    // const schema=Joi.object({
    //     url: Joi.string(),
    //     desc:Joi.string(),
    //     tags: Joi.string()
    // })
    const bm={
        id:bookmarks_list.length+1,
        url:req.body.url,
        desc:req.body.desc,
        tags:req.body.tags
    }
    bookmarks_list.push(bm)
    res.send(bookmarks_list)
});

/* find is only working for strings not for numbers */




router.put('/put/:url',(req,res)=>{
    var updated_bookmarks={
        url:req.body.url,
        desc:req.body.desc,
        tags:req.body.tags
    };
    const bookmark_put=bookmarks_list.find(index=>index.url===req.params.url)
    if(!bookmark_put){
        return res.status(400).send(`no such title exists`)
  }
  const result=validateBookmark(req.body,schema)
  if (!result.error){
      bookmark_put.url=updated_bookmarks.url;
      bookmark_put.desc=updated_bookmarks.desc;
      bookmark_put.tags=updated_bookmarks.tags;

      return res.send(`bookmark updated ${bookmarks_list}`)
    }
    else{
        return res.status(400).send("Error", result.error.details[0].message)
    }
});

router.delete('/delete/:url',(req,res)=>{
    const bookmark_delete=bookmarks_list.find(index=>index.url===req.params.url)
      
    if(!bookmark_delete){
        return res.status(400).send(`No such URL exists`)
  }
  const index=bookmarks_list.indexOf(bookmark_delete);
  courses.splice(index,1);

    res.send(bookmark_lists)
})



/* with mongodb */



// router.post('/',(req,res)=>{
//     const bookmarksSchema=new mongoose.Schema({
//         url:String,
//         desc:String,
//         tags:[String]
//     })
    
//     const List_of_bookmark=mongoose.model('List_of_Bookmark',bookmarksSchema)    //returns a class
    
    
//     async function createBookmark(){
    
//         const list_of_bookmark=new List_of_bookmark({
//             url:req.body.url,
//             desc:req.body.desc,
//             tags:req.body.tags
//         })
//            res.send(list_of_bookmark)

//            const result= await list_of_bookmark.save();
//         //  console.log(result)        
//     }
//     createBookmark()
    
// })


// router.get('/:url',(req,res)=>{
//     const bookmark_get=loonity.list_of_bookmark.find(index=>index.url===req.params.url)
//     if (!bookmark_get){
//         res.status(400).send(`There is no such url ${req.params.url}`)
//     }
//     else{
//         res.send(bookmark_get)
//     }
// })



module.exports=router


