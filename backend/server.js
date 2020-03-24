const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');
const Data = require('./data');
const Users = require('./users')
const Products = require('./products')
const Companies = require('./companies');
const Categories = require('./categories');
const passwordHash = require('password-hash');
const BCRYPT_SALT_ROUNDS = 12;
const jwt = require('jsonwebtoken');  
const multer = require('multer')
//const Users = require('./users');
//const Services = require('./services');
//const NavItems = require('./navitems');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
  cb(null, __dirname.replace("backend","")+'/public/images/profile')
},
filename: function (req, file, cb) {
  cb(null, Date.now() + '-' +file.originalname )
}
})
const upload = multer({ storage: storage }).single('file')
const API_PORT = 3001;
const app = express();
app.use(cors());
const router = express.Router();

// this is our MongoDB database
const dbRoute =
  'mongodb://localhost:27017/services-db';

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


router.post('/upload',(req, res) =>{
  console.log(req,res)
upload(req, res, function (err) {
   
       if (err instanceof multer.MulterError) {
           return res.status(500).json(err)
       } else if (err) {
           return res.status(500).json(err)
       }
  return res.status(200).send(req.file)

})

});
// this is our get method
// this method fetches all available data in our database
router.get('/getCompanies', (req, res) => {
  Companies.find((err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});

router.post("/newCompany", (req, res) => {
  let data = new Companies();

  const { businessName, businessLocation } = req.body;

  if (!businessName ) {
    return res.json({
      success: false,
      error: 'INVALID INPUTS',
    });
  }
  data.businessName = businessName;
  data.businessLocation = businessLocation;
  data.save((err) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});


router.post('/addProduct', (req, res) => {
  let product = new Products();

  const { title, description, productOwnerId, price, productType} = req.body;

  if (!title) {
    return res.json({
      success: false,
      error: 'INVALID INPUTS',
    });
  }
  product.title =title;
  product.description = description;
  product.productOwnerId = productOwnerId
  product.price = price
  product.productType = productType
  product.save((err) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true,product });
  });
});
router.post('/addCompany', (req, res) => {
  let company = new Companies();

  const { businessName, businessLocation} = req.body;

  if (!businessName) {
    return res.json({
      success: false,
      error: 'INVALID INPUTS',
    });
  }
  company.businessName =businessName;
  company.businessLocation = businessLocation;

  company.save((err) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true,company });
  });
});
router.post('/addCategory', (req, res) => {
  let category = new Categories();

  const { name, description} = req.body;

  if (!name) {
    return res.json({
      success: false,
      error: 'INVALID INPUTS',
    });
  }
  category.name =name;
  category.description = description;

  category.save((err) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true,category });
  });
});

router.post('/registerUser', (req, res) => {
  let data = new Users();

  const { name, personalEmail, password, terms } = req.body;

  if (!personalEmail) {
    return res.json({
      success: false,
      error: 'INVALID INPUTS',
    });
  }
  data.name =name;
  data.personalEmail = personalEmail;
  data.password = passwordHash.generate(password)
  data.terms = terms
  data.save((err) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true,user:data });
  });
});


router.post('/loginUser', (req, res) => {
  
  Users.findOne({personalEmail:req.body.personalEmail},(err,user)=>{
    if(err) throw err;
    if(passwordHash.verify(req.body.password, user.password))
    return res.json({ login: true,user:user });
  })
});

// this is our get method
// this method fetches all available data in our database
router.get('/getData', (req, res) => {
  Data.find((err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});

router.get('/loadCompanies', (req, res) => {
  Companies.find((err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});

router.get('/loadProducts', (req, res) => {
  Products.find((err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});

router.get('/loadUsers', (req, res) => {
  Users.find((err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});

router.get('/loadCategories', (req, res) => {
  Categories.find((err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});
// this is our update method
// this method overwrites existing data in our database
router.post('/updateData', (req, res) => {
   
  const { id, update } = req.body;
  Data.findByIdAndUpdate(id, update, (err) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

router.post('/updateUser', (req, res) => {
   const user = req.body;
   const { _id } = req.body;

  Users.findByIdAndUpdate(_id, user, (err,data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true,data });
  });
});

// this is our delete method
// this method removes existing data in our database
router.delete('/deleteData', (req, res) => {
  const { id } = req.body;
  Data.findByIdAndRemove(id, (err) => {
    if (err) return res.send(err);
    return res.json({ success: true });
  });
});

router.delete('/deleteProduct', (req, res) => {
  const { _id } = req.body;
  Products.findByIdAndRemove(_id, (err) => {
    if (err) return res.send(err);
    return res.json({ success: true });
  });
});

router.delete('/deleteCategory', (req, res) => {
  const { _id } = req.body;
  Categories.findByIdAndRemove(_id, (err) => {
    if (err) return res.send(err);
    return res.json({ success: true });
  });
});

router.delete('/deleteCompany', (req, res) => {
  const { _id } = req.body;
  Companies.findByIdAndRemove(_id, (err) => {
    if (err) return res.send(err);
    return res.json({ success: true });
  });
});

// this is our create methid
// this method adds new data in our database
router.post('/putData', (req, res) => {
  let data = new Data();

  const { id, message } = req.body;

  if ((!id && id !== 0) || !message) {
    return res.json({
      success: false,
      error: 'INVALID INPUTS',
    });
  }
  data.message = message;
  data.id = id;
  data.save((err) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

// append /api for our http requests
app.use('/api', router);

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));