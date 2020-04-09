const express=require('express');
const router =express.Router();

const bookmarks_list=[
    {id:1, url:'bm1', desc:'music', tags:'song'},
    {id:2, url:'bm2', desc:'', tags:''}
]

router.post('/', (req,res)=>{
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
    const bm={
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
    bookmarks_list.push(bm)
    res.send(bookmarks_list)
});

router.get('/:url', (req,res)=>{
    // res.send(bookmarks)
    // res.send(req.params.id)
    const bookmark_get=bookmarks_list.find(index=>index.url===req.params.url)
    if (!bookmark_get){
        res.status(400).send(`There is no such url ${req.params.url}`)
    }
    else{
        res.send(bookmark_get)
    }
})


module.exports=router