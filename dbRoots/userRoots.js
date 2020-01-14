const express = require('express');
var router = express.Router();
var userSchema = require('../dbModels/user');
var serviceEmail = require('../services/email');
var imgSchema = require('../dbModels/img');
var videoSchema = require('../dbModels/video');
var serviceSMS = require('../services/sms');
var async = require('async');
const multer = require('multer');

var imgStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/images');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});
var imgUpload = multer({
  storage: imgStorage
});

module.exports = imgUpload;

var videoStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/videos');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});
var vidUpload = multer({
  storage: videoStorage
});

module.exports = vidUpload;


// const imgUpload = multer({
//   dest: './uploads/images'
// });

// const vidUpload = multer({
//   dest: './uploads/video'
// });


router.post("/add", (req, res) => {
  console.log(req.body);
  var saveData = new userSchema(req.body);
  saveData.save((err, result) => {
    if (err) {
      console.log("Error while Saving " + err);
      res.sendStatus(500);
    } else {
      console.log("Data Saved " + saveData);
      serviceEmail.sendEmail(), serviceSMS.sendSMS(saveData.name, saveData.email, saveData.phone),
        res.send({
          status: "success"
        });
    }
  });
});


router.get("/disp", (req, res) => {
  userSchema.find((err, response) => {
    if (err) {
      console.log(err);
    } else {
      console.log(response);
      res.send(response);
    }
  });
});


router.post("/delete", (req, res) => {
  userSchema.deleteOne({
      _id: req.body.id
    },
    function (err, resp) {
      if (err) {
        console.log(err);
      } else {
        console.log(resp);
        res.send(resp);
      }
    }
  );
});


router.post("/edit", (req, res) => {
  userSchema.updateOne({
      _id: req.body.id
    }, {
      $set: {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone
      }
    },
    function (err, resp) {
      if (err) {
        console.log(err);
      } else {
        console.log(resp);
        res.send(resp);
      }
    }
  );
});


router.post("/upload", (req, res) => {
  excelData = req.body;
  async.eachSeries(excelData, (data, callback) => {
    const objUpload = {
      name: data.name,
      email: data.email,
      phone: data.phone
    }; {
      if (typeof data.name === 'string' && data.name != ' ' && typeof data.email === 'string' && data.email != ' ' && typeof data.phone === 'string' && data.phone != ' ' && data.phone.length == 10) {
        const userUploadData = new userSchema(objUpload);
        userUploadData.save((err, result) => {
          if (err) {
            console.log('not saved');
          } else {
            console.log('saved : ', result);
          }
        });
        console.log("done"),
          serviceSMS.sendSMS(userUploadData.name, userUploadData.email, userUploadData.phone);
      } else {
        console.log('error')
      }
      callback();
    }
  });
});


router.post('/images', imgUpload.single('photo'), (req, res) => {
  console.log(req.file);
  let imgData = new imgSchema(req.file);
  imgData.save((err, result) => {
    if (err) {
      console.log('error in saving images');
    } else {
      if (req.file.originalname) {
        res.status(200).send(req.file.originalname);
        console.log('Image Saved');
      } else {
        console.log('nahi gaya img');
      }
    }
  });
});


router.get('/imgDisp', (req, res) => {
  imgSchema.find((err, response) => {
    if (err) {
      console.log(err);
    } else {
      console.log(response);
      res.send(response);
    }
  });
});


router.post('/video', vidUpload.single('video'), (req, res) => {
  console.log(req.file);
  let videoData = new videoSchema(req.file);
  videoData.save((err, result) => {
    if (err) {
      console.log('error in saving video');
    } else {
      if (req.file.originalname) {
        res.status(200).send(req.file.originalname);
        console.log('video uploaded');
      } else {
        console.log('nahi gaya video');
      }
    }
  })
});


router.get('/videoDisp', (req, res) => {
  videoSchema.find((err, response) => {
    if (err) {
      console.log(err);
    } else {
      console.log(response);
      res.send(response);
    }
  });
});

module.exports = router;