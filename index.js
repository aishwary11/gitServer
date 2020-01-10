var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var compression = require('compression')
var mongoose = require('mongoose');


const app = express();
var cors = require('cors');
app.use(cors({
  credentials: true
}));
app.use(compression());

const bodyParser = require('body-Parser');

app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());

app.use(bodyParser.json());
app.listen(5000, (req, res) => {
  console.log('Server on port 5000!');
});

app.get('/', (req, res) => {
  console.log("Hello");
  res.send("Hello");
})

var userRouts = require('./dbRoots/userRoots');
app.use('/user', userRouts);
// var loginRouts = require('./loginRoots/loginRoots');
// app.use('/login', loginRouts);

// if (app.get('env') == 'development') {
// mongoose.connect("mongodb://172.16.1.60:27017/CrudDB", {
mongoose.connect("mongodb://localhost:27017/CrudDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, (err) => {
  if (err) console.log("Error connecting mongodb....")
  else console.log("Bhai server chalu ho gaya hai")
})
// }