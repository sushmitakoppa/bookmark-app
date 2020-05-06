const express=require('express');
const router =express.Router();
const Joi=require('joi');

const mongoose=require('mongoose');

const bookmark_schema=require('./schemas/bookmarks/bookmark_schema')

/* connection to database */
mongoose.connect('mongodb+srv://sushmita:Koppa%4054321@cluster0-q5v1k.mongodb.net/test?retryWrites=true&w=majority'||'mongodb://localhost:27017/loonity',{useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>{
    console.log('connected to db')
})
.catch((err)=>{
    console.log('Error',err.name)
})

/* without mongo db************* */

// const bookmarks_list=[
//     {id:1, url:'bm1', desc:'music', tags:'song'},
//     {id:2, url:'bm2', desc:'', tags:''}
// ]

// function validateBookmark(bookmark){
//     const schema={
//         id:Joi.string(),
//         url:Joi.string().min(3).required(),
//         desc:Joi.string(),
//         tags:Joi.string()
//     }
//     return Joi.validate(bookmark, schema)
// }


// /*  RENDERING FRONT END */

// // router.get('/:name', (req,res)=>{
// //     root=path.join(__dirname,'public')
// //     var filename=req.params.name
// //     res.sendFile(filename,root,err=>{
// //         if(err){
// //             console.log('error')
// //         }
// //         else{
// //             console.log('sent',filename)
// //         }
// //     });
// // });


// // router.get('/',(req,res)=>{
// //     res.send(path.join(__dirname+ '/front-end/index.html'))
// // })

router.get("/", (req, res) => {
    res.sendFile(__dirname + "/front-end/index.html");
   });


//get all the data of backend

router.get('/list',(req,res)=>{

    async function getBookmark(){

        const list = await List_of_bookmark.find();
        res.send(list);
        console.log(list);
    }
    getBookmark()
})


// // router.get('/',(req,res)=>{
// //     res.send(bookmarks_list)
// // })


// /* CRUD operation */



// /*GET */


// router.get('/:url', (req,res)=>{

//     const bookmark_get=bookmarks_list.find(index=>index.url===req.params.url)
//     if (!bookmark_get){
//         res.status(400).send(`There is no such url ${req.params.url}`)
//     }
//     else{
//         res.send(bookmark_get)
//     }
// })


// // /* POST */

// router.post('/', (req,res)=>{



//     const result=validateBookmark(req.body)
//     if (result.error){
//         return res.status(400).send(result.error.details[0].message); 
//     }
//     // console.log(result)
//     // const schema=Joi.object({
//     //     url: Joi.string(),
//     //     desc:Joi.string(),
//     //     tags: Joi.string()
//     // })
//     const bm={
//         id:bookmarks_list.length+1,
//         url:req.body.url,
//         desc:req.body.desc,
//         tags:req.body.tags
//     }
//     const repeated_bm=bookmarks_list.find(index=>index.url===bm.url)
//     if(!repeated_bm){
//         bookmarks_list.push(bm)
//         return res.send(bookmarks_list)
//     }
//     return res.send('This URL is already present')
// });

// // /* find is only working for strings not for numbers */

// // /* PUT */


// router.put('/:url',(req,res)=>{
//     const bookmark_put=bookmarks_list.find(index=>index.url===req.params.url)
//     if(!bookmark_put){
//         return res.status(400).send(`No such title exists ${req.params.url}`)
//   }
    
//   const result=validateBookmark(req.body)
//   if (!result.error){
//     var updated_bookmarks={
//         url:req.body.url,
//         desc:req.body.desc,
//         tags:req.body.tags
//     };
//       bookmark_put.url=updated_bookmarks.url;
//       bookmark_put.desc=updated_bookmarks.desc;
//       bookmark_put.tags=updated_bookmarks.tags;

//       return res.send(`bookmark updated `)
//     }
//     else{
//         return res.status(400).send( result.error.details[0].message)
//     }
// });


// // /*DELETE */

// router.delete('/:url',(req,res)=>{
//     const bookmark_delete=bookmarks_list.find(index=>index.url===req.params.url)
      
//     if(!bookmark_delete){
//         return res.status(400).send(`No such URL exists`)
//   }
//   const index=bookmarks_list.indexOf(bookmark_delete);
//   bookmarks_list.splice(index,1);

//     res.send(bookmarks_list)
// })



/* with mongodb */



// const bookmarksSchema=new mongoose.Schema({
//     url:String,
//     desc:String,
//     tags:[String]
// })

// const List_of_bookmark=mongoose.model('List_of_Bookmark',bookmarksSchema)    //returns a class
router.post('/',(req,res)=>{
    
    
    async function createBookmark(){
    
        const list_of_bookmark=new bookmark_schema({
            url:req.body.url,
            desc:req.body.desc,
            tags:req.body.tags
        })

           const result= await list_of_bookmark.save();
           res.send(list_of_bookmark)
         console.log(result)        
    }
    createBookmark()
    
})


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


