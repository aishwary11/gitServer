const express = require('express');
var router = express.Router();
var userSchema = require("../dbModels/user");
var serviceEmail = require('../services/email');
var serviceSMS = require('../services/sms');
var async = require('async');
const multer = require('multer');
const imgUpload = multer({
  dest: './uploads/images'
})

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
  userSchema.find(function (err, response) {
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
  if (req.file) {
    res.json(req.file);
    console.log('ho gaya upload');
  } else throw 'error';
  // console.log(req.file);
  // const userImg = new User({
  //   _id: new mongoose.Types.ObjectId(),
  //   name: req.body.name,
  //   phone: req.body.phone
  // });
  // userImg.save().then(result => {
  //   console.log(result);
  //   res.status(201).json({
  //     message: "Created user successful",
  //     userCreated: {}
  //   })
  // })
});

module.exports = router;