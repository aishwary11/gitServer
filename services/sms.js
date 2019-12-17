smsController = {}

var unirest = require("unirest");

smsController.sendSMS = (name, email, phone) => {
  var data = {
    name: name,
    email: email,
    phone: phone
  }
  console.log(data);
  var message = "Name: " + name + " Email: " + email + " Phone: " + phone;
  var req = unirest("GET", "https://www.fast2sms.com/dev/bulk");
  req.query({
    "authorization": "WTUYp1O86iv15OJViRlSgKbmQ4PHdmBnYvgJNroMkqPYNM1FzEm53mo35MG3",
    "sender_id": "FSTSMS",
    "message": message,
    "language": "english",
    "route": "p",
    "numbers": phone,
  });

  req.headers({
    "cache-control": "no-cache"
  });

  req.end(function (res) {
    if (res.error) throw new Error(res.error);
    console.log(res.body);
  });
}

module.exports = smsController;