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
const Events = require('./events')
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

const API_PORT = 5021;
const app = express();
app.use(cors());
const router = express.Router();
// this is our MongoDB database
const dbRoute ='mongodb://127.0.0.1:27017/johandemeij-db';
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
router.post('/createCd', async (req,res) => {
  let post = new Cds()
  const { id,cdName,subTitle,composer,instrumentation,synopsis,totalTime,category,codes,duration,grade,cd,otherCd,score,audio,video } = req.body
  console.log(cdName,subTitle,composer,instrumentation,synopsis,totalTime,category,codes,duration,grade,cd,otherCd,score,audio,video)
  if (!id)
  return res.json({ success: false, error: 'INVALID INPUTS', });
  
  post.id = id;
  post.cdName=cdName;
  if(subTitle)post.subTitle=subTitle;
  if(composer)post.composer=composer;
  if(instrumentation)post.instrumentation=instrumentation;
  if(synopsis)post.synopsis=synopsis;
  if(totalTime)post.totalTime=totalTime;
  if(category)post.categorypost.codes=codes;
  if(duration)post.duration=duration;
  if(grade)post.grade=grade;
  if(cd)post.cd=cd;
  if(otherCd)post.otherCd=otherCd;
  if(score)post.score=score;
  if(audio)post.audio=audio;
  if(video)post.video=video;  
  
try{
   post.save((err) => {
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true });
    });

} catch(err) {
  console.log('That did not go well.')
  console.error(error)
  process.exit(1)
}
    
})
router.post('/createPresentation', async (req,res) => {
  let post = new Presentations()
  const { id,cdName,subTitle,composer,instrumentation,synopsis,totalTime,category,codes,duration,grade,cd,otherCd,score,audio,video } = req.body
  console.log(cdName,subTitle,composer,instrumentation,synopsis,totalTime,category,codes,duration,grade,cd,otherCd,score,audio,video)
  if (!id)
  return res.json({ success: false, error: 'INVALID INPUTS', });
  
  post.id = id;
  post.cdName=cdName;
  if(subTitle)post.subTitle=subTitle;
  if(composer)post.composer=composer;
  if(instrumentation)post.instrumentation=instrumentation;
  if(synopsis)post.synopsis=synopsis;
  if(totalTime)post.totalTime=totalTime;
  if(category)post.categorypost.codes=codes;
  if(duration)post.duration=duration;
  if(grade)post.grade=grade;
  if(cd)post.cd=cd;
  if(otherCd)post.otherCd=otherCd;
  if(score)post.score=score;
  if(audio)post.audio=audio;
  if(video)post.video=video;  
  
try{
   post.save((err) => {
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
router.delete('/deleteCd/:id',(req,res)=>{
  let id = ObjectId(req.params.id);  
  Cds.remove({  
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
router.get('/loadAllAgendas', async (req, res) => {
  const pipeline = [{$match:{}}]
  Agendas.aggregate(pipeline,(err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  })
});
router.get('/loadAgendasByPage/:numberToSkip/:numberToLimit/', async (req, res) => {
  let d = new Date();
  const pipeline = [{ 
    "$match": {
        "orchestra": { 
            "$exists": true, 
            "$ne": null ,
            "$ne": '' 
        }
    }    
}]
  if(parseInt(req.params.numberToLimit) === 0)
  console.log(req.params)
 // pipeline.push({$match:{},"$and":[{"orchestra":{"$ne":""}},{"orchestra":{"$ne":null}}]})
 
  pipeline.push({ '$sort': {'year': -1,'month':-1,'day':-1} })
  
  if(req.params.numberToLimit && parseInt(req.params.numberToLimit) !== 0)
  pipeline.push({ '$limit':  parseInt(req.params.numberToLimit,10) });

  if(req.params.numberToSkip && parseInt(req.params.numberToSkip) !== 0)
  pipeline.push({ '$skip': parseInt(req.params.numberToSkip,10) });

  
  Agendas.aggregate(pipeline,(err,data)=>{
    console.log(pipeline)
    if (err) 
      return res.json({ success: false, error: err });
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
 const pipeline = [{$match: {'year':req.params.year,'month':{$gte:req.params.month},"$and":[{ "month":{$gte:req.params.month},"orchestra":{"$ne":""}},{"orchestra":{"$ne":null}}]}}]
 pipeline.push({ '$sort': {'month': 1} })
 await Agendas.aggregate(pipeline,(err,data)=>{
        if (err) return res.json({ success: false, error: err });
        //console.log(res.json(data))
        return res.json({ success: true, data: data });
    })
});
router.get('/loadEvents', (req, res) => {
 Events.find((err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
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
router.get('/loadPresentationByID/:id', async (req, res) => {
  const pipeline = [{$match: {id:req.params.id}}]
  Presentations.aggregate(pipeline,(err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});
router.get('/loadEventByID/:id', async (req, res) => {
  const pipeline = [{$match: {"id":req.params.id}}] 
 await Events.aggregate(pipeline,(err, data) => {
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

 
  pipeline.push({ '$sort': {'cdName': 1} })
  
  if(req.params.numberToLimit && parseInt(req.params.numberToLimit) !== 0)
  pipeline.push({ '$limit':  parseInt(req.params.numberToLimit,10) });

  if(req.params.numberToSkip && parseInt(req.params.numberToSkip) !== 0)
  pipeline.push({ '$skip': parseInt(req.params.numberToSkip,10) });

  
  Presentations.aggregate(pipeline,(err,data)=>{
    console.log(pipeline)
    if (err) 
      return res.json({ success: false, error: err });
      return res.json({ success: true, data: data });
    })
});
router.get('/loadAllPresentations', async (req, res) => {
  const pipeline = [{$match: {}}]
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
router.post('/updateEvent',(req,res)=>{
  const {_id,title,synopsis} = req.body;
  Events.findOneAndUpdate({_id:_id},
    { 
      $set:{title,synopsis}
    },
    (err,data)=>{
      if(err) res.json({success:false,error:err})
      return res.json({success:true,data})
    })
})
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
router.post('/updateCd',(req,res)=>{
 
  Cds.findByIdAndUpdate({_id:req.body._id},
    { 
      $set:req.body
    },
    (err,data)=>{
      if(err) res.json({success:false,error:err})
      return res.json({success:true,data})
    })
})
router.post('/updatePresentation',(req,res)=>{

  Presentations.findByIdAndUpdate({_id:req.body._id},
    { 
      $set:req.body
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
router.post('/updateCdImage',(req,res)=>{
  const {_id,frontCover,frontCaption
    ,backCover,backCaption} = req.body;
  Cds.findByIdAndUpdate({_id:_id},
    { 
      $set:{frontCover,frontCaption
        ,backCover,backCaption}
    },
    (err,data)=>{
      if(err) res.json({success:false,error:err})
      return res.json({success:true,data})
    })
})
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
 router.post('/uploadPresentationImage',(req,res)=>{
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
 router.post('/updatePresentationImage',(req,res)=>{
  const {_id,frontCover,frontCaption
    ,backCover,backCaption} = req.body;
  Presentations.findByIdAndUpdate({_id:_id},
    { 
      $set:{frontCover,frontCaption
        ,backCover,backCaption}
    },
    (err,data)=>{
      if(err) res.json({success:false,error:err})
      return res.json({success:true,data})
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
stream {
  server {
  listen  27017;
  proxy_connect_timeout 1s;
  proxy_timeout 3s;
  proxy_pass    stream_mongo_backend;
}

upstream stream_mongo_backend {
  server 127.0.0.1:5021;
}
}
