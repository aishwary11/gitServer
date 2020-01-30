const express = require('express');
var router = express.Router();
var loginSchema = require(`${__dirname}/../dbModels/login`);
const jwt = require('jsonwebtoken');

// var regUser = /^([a-zA-Z]{3,10})([0-9]{2})$/;
// var regPass = /^([a-z]{3,10})$/;

router.post('/', (req, res) => {
  let promise = loginSchema.find({
    name: req.body.name
  })
})

router.post('/token', (req, res) => {

})


// router.post("/", (req, res) => {
//   let promise = loginSchema.findOne({
//     name: req.body.name
//   }).exec()
//   promise.then(function (doc) {
//     if (doc) {
//       if (doc.isValid(req.body.pass)) {
//         let token = jwt.sign({
//           name: doc.name
//         }, 'secret', {
//           expiresIn: '1h'
//         })
//         return res.status(200).json(token);
//       } else {
//         return res.status(501).json({
//           message: "Invalid Credentials"
//         })
//       }
//     } else {
//       return res.status(501).json({
//         message: 'User name is not available'
//       })
//     }
//   })
//   promise.catch(function (err) {
//     return res.status(501).json({
//       message: 'some internal error'
//     });
//   })
// });


module.exports = router;