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
  cb(null, __dirname.replace("backend","")+'/public/images/post')
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
mongoose.connect(dbRoute, { useNewUrlParser: true });
let db = mongoose.connection;
db.once('open', () => console.log('connected to the database'));

// checks if connection with the database is successful
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));

router.get('/loadMusic', (req, res) => {
  MusicAlbums.find((err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});
router.get('/loadPosts', (req, res) => {
  Posts.find((err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});

router.get('/loadOrders', (req, res) => {
  Orders.find((err, data) => {
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

router.get('/loadPublications', async (req, res) => {
  Presentations.find((err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});

router.get('/loadCds', async (req, res) => {
  Cds.find((err, data) => {
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

router.get('/loadAgendas', async (req, res) => {
  Agendas.find((err, data) => {
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
  const {_id,albumID,imageName,caption} = req.body;
  PostImages.findOneAndUpdate({_id:_id},
    { 
      $set:{albumID,imageName,caption}
    },
    (err,data)=>{
      if(err) res.json({success:false,error:err})
      return res.json({success:true,data})
    })
})
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

// append /api for our http requests
app.use('/api', router);

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));