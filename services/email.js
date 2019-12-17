var nodemailer = require('nodemailer');

emailController = {}

emailController.sendEmail = () => {
  var transporter = nodemailer.createTransport({
    host: "smtp.ethereal.mail",
    port: 465,
    secure: false,
    auth: {
      user: '123',
      pass: '123'
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  var mailOptions = {
    from: 'aishwary.shah@onelifecapital.in',
    to: ['aishwary.shah@onelifecapital.in', 'ajay.sahu@onelifecapital.in'],
    subject: 'Notification',
    text: 'user added'
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}
module.exports = emailController;