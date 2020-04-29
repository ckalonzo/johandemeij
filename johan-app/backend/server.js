const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');
const Posts = require('./posts');
const PostImages = require('./postImages');
const Cds = require('./cds');
const Cdinfo = require('./cdinfo');
const Presentations = require('./presentations')
const Orders = require('./orders')
const MusicAlbums = require('./music')
const Agendas = require('./agendas')
const passwordHash = require('password-hash');
const BCRYPT_SALT_ROUNDS = 12;
const jwt = require('jsonwebtoken');  
const multer = require('multer')


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
  cb(null, __dirname.replace("backend","")+'/public/images/posts')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' +file.originalname )
  }
})
const upload = multer({ storage:storage}).single('file')

const API_PORT = 3001;
const app = express();
app.use(cors());
const router = express.Router();
// this is our MongoDB database
const dbRoute ='mongodb://localhost:27017/johandemeij-db';
// connects our back end code with the database
mongoose.connect(dbRoute, { useUnifiedTopology: true,useNewUrlParser: true });
let db = mongoose.connection;
let ObjectId = require('mongodb').ObjectId;
db.once('open', () => console.log('connected to the database'));

// checks if connection with the database is successful
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));

router.post('/createPost', async (req,res) => {
  let post = new Posts()
  const { ID,date,postContent,postImage,showPost,title } = req.body
  if (!ID )
  return res.json({ success: false, error: 'INVALID INPUTS', });
  
  post.ID = ID;
  post.postDate = date;
  post.postContent = postContent;
  post.postImage = postImage;
  post.showPost = showPost
  post.postTitle = title;
try{
  await post.save((err) => {
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true });
    });

} catch(err) {
  console.log('That did not go well.')
  console.error(error)
  process.exit(1)
}
    
})
router.delete('/deletePost/:id',(req,res)=>{
  let id = ObjectId(req.params.id);  
  Posts.remove({  
      _id: id
  }, function (err, data) {
      if (err) return res.send(err);
      res.json({ message: 'Deleted',data });
  }); 
})
router.delete('/deletePostImage/:id', (req, res, next) => {
  let id = ObjectId(req.params.id);  
  PostImages.remove({  
      _id: id
  }, function (err, data) {
      if (err) return res.send(err);
      res.json({ message: 'Deleted',data });
  }); 
});
router.get('/filterPresentationCategory/:category', async (req, res) => {
   
  const pipeline = []
  if(req.params.category > 0){
  pipeline.push( {$match: {"category":req.params.category}})
  } else {
    pipeline.push( {$match: {}} )
  }
  pipeline.push({ '$sort': {'cdName': 1} })

  Presentations.aggregate(pipeline,(err,data)=>{
    if (err) 
      return res.json({ success: false, error: err });
      return res.json({ success: true, data: data });
    })
});
router.get('/loadAgendas', async (req, res) => {
  Agendas.find((err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  })
});
router.get('/loadCds', async (req, res) => {
  const pipeline = [{$match: {}}]
  pipeline.push({ '$sort': {'cd_name': 1} })

  Cds.aggregate(pipeline,(err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});
router.get('/loadCdinfo', async (req, res) => {
  Cdinfo.find((err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});
router.get('/loadfilteredAgendas/:numberToSkip/:numberToLimit/:year/:month/', async (req, res) => {
  const numberToSkip = parseInt(req.params.numberToSkip,10);
  const numberTolimit = parseInt(req.params.numberToLimit,10);
  const month = req.params.month;
  const year = req.params.year;
 //{ $match : { 'year' : year, 
 // "$and":[{ "month":{$gte:month},"orchestra":{"$ne":""}},{"orchestra":{"$ne":null}}] 
//}},
//  { $skip: numberToSkip },
//  { $sort: {'month': 1, 'day' : 1} },
//  { $limit: numberTolimit }
 const pipeline = [{$match: {'year':'2020','month':{$gte:month},"$and":[{ "month":{$gte:month},"orchestra":{"$ne":""}},{"orchestra":{"$ne":null}}]}}]
 pipeline.push({ '$sort': {'month': 1} })
 await Agendas.aggregate(pipeline,(err,data)=>{
        if (err) return res.json({ success: false, error: err });
        //console.log(res.json(data))
        return res.json({ success: true, data: data });
    })
});
router.get('/loadMusicAlbums',(req,res)=>{
  MusicAlbums.find((err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});
router.get('/loadMusic', (req, res) => {
  MusicAlbums.find((err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});
router.get('/loadMusicProfile/:id', async (req, res) => {
  const ID = req.params.id;

  presentations.findOne({"_id":ID},
  (err,data)=>{
        if (err) return res.json({ success: false, error: err });
        //console.log(res.json(data))
        return res.json({ success: true, data: data });
    })
});
router.get('/loadMusicProfileByID/:id', async (req, res) => {
  const ID = req.params.id;

  presentations.findOne({"id":ID},
  (err,data)=>{
        if (err) return res.json({ success: false, error: err });
        //console.log(res.json(data))
        return res.json({ success: true, data: data });
    })
});
router.get('/loadPosts', (req, res) => {
  const pipeline = [{$match: {"showPost":"1"}}]
  pipeline.push({ '$sort': {'postDate': -1} })
  pipeline.push({
    $lookup:
      {
        from: "postimages",
        localField: "ID",
        foreignField: "albumID",
        as: "postImage"
      }
 })

  Posts.aggregate(pipeline,(err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});
router.get('/loadAllPosts', (req, res) => {
  const pipeline = [{$match: {}}]
  pipeline.push({ '$sort': {'postDate': -1} })
  pipeline.push({
    $lookup:
      {
        from: "postimages",
        localField: "ID",
        foreignField: "albumID",
        as: "postImage"
      }
 })

  Posts.aggregate(pipeline,(err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});
router.get('/loadPostByID/:id', async (req, res) => {
  
  const pipeline = [{$match: {"ID":req.params.id}}]
  pipeline.push({
    $lookup:
      {
        from: "postimages",
        localField: "ID",
        foreignField: "albumID",
        as: "postImage"
      }
 })
  
  Posts.aggregate(pipeline,(err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});
router.get('/loadPostImages', async (req, res) => {
  PostImages.find((err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});
router.get('/loadPresentations/:numberToSkip/:numberToLimit/', async (req, res) => {
  const pipeline = []
  if(parseInt(req.params.numberToLimit) === 0)
  console.log(req.params)

  if(req.params.numberToSkip && parseInt(req.params.numberToSkip) !== 0)
  pipeline.push({ '$skip': parseInt(req.params.numberToSkip,10) });

  pipeline.push({ '$sort': {'cdName': 1} })
  
  if(req.params.numberToLimit && parseInt(req.params.numberToLimit) !== 0)
  pipeline.push({ '$limit':  parseInt(req.params.numberToLimit,10) });
  
  Presentations.aggregate(pipeline,(err,data)=>{
    console.log(pipeline)
    if (err) 
      return res.json({ success: false, error: err });
      return res.json({ success: true, data: data });
    })
});
router.get('/loadOrders', (req, res) => {
  Orders.find((err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});
router.post('/updatePost',(req,res)=>{
  const {_id,ID,date,content,title,postParent,showPost} = req.body;
  Posts.findOneAndUpdate({_id:_id},
    { 
      $set:{postDate:date,postContent:content,postTitle:title,showPost}
    },
    (err,data)=>{
      if(err) res.json({success:false,error:err})
      return res.json({success:true,data})
    })
})
router.post('/updatePostImage',(req,res)=>{
  const {_id,imageName,albumID,caption,cover} = req.body;
console.log(_id,imageName,albumID,caption,cover)
  PostImages.findOneAndUpdate({_id:_id},
    { 
      $set:{imageName,caption,cover,albumID}
    },(err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});
router.post('/createPostImage',async (req,res)=>{
  
let image = new PostImages()
  const { imageName,albumID,caption,cover } = req.body
  if (!albumID )
  return res.json({ success: false, error: 'INVALID INPUTS', });
  
  image.imageName = imageName;
  image.albumID = albumID;
  image.caption = caption;
 image.cover = cover;
try{
  await image.save((err) => {
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true });
    });

} catch(err) {
  console.log('That did not go well.')
  console.error(error)
  process.exit(1)
}
});
router.post('/uploadPostImage',(req,res)=>{
  console.log(req,res)
  upload(req,res, function(err){
    if(err instanceof multer.MulterError){
      return res.status(500).json(err)
    } else if(err){
      return res.status(500).json(err)
    }
    return res.status(200).json(req.file)
  })
 })
router.post('/updatePublications',(req,res)=>{
  const {_id,id,cdName,subTitle,composer,instrumentation,synopsis,totalTime,frontCover,backCover,dateCreated,frontCaption,backCaption,category,codes,duration,grade,cd,otherCd,score,audio,video} = req.body;
  Presentations.findOneAndUpdate({_id:_id},
    { 
      $set:{id,cdName,subTitle,composer,instrumentation,synopsis,totalTime,frontCover,backCover,dateCreated,frontCaption,backCaption,category,codes,duration,grade,cd,otherCd,score,audio,video}
    },
    (err,data)=>{
      if(err) res.json({success:false,error:err})
      return res.json({success:true,data})
    })
})
router.get('/testPostImages/:id', async (req, res) => {
  const {_id,imageName,caption,cover} = req.body;
console.log(_id,imageName,caption,cover)
  PostImages.findOneAndUpdate({_id:req.params.id},
    { 
      $set:{imageName,caption,cover}
    },(err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});
// append /api for our http requests
app.use('/api', router);

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));