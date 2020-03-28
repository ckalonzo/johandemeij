const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');
const Posts = require('./posts');
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
  'mongodb://localhost:27017/johandemeij-db';

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


router.get('/loadPosts', (req, res) => {
  Posts.find((err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});

// append /api for our http requests
app.use('/api', router);

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));