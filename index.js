const express = require('express')
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express()
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/signup.html");
})

app.post("/", function(req, res) {
  const firstName = req.body.FirstName;
  const lastName = req.body.LastName;
  const email = req.body.Email;
  //console.log("My Name : " + firstName + " " + lastName + "\nMy email :" + email);
  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  };

  const jsonData = JSON.stringify(data);
  const url = "https://us21.api.mailchimp.com/3.0/lists/5f7dbb3fd3";
  const options = {
    method: "POST",
    auth: "tony9999:26b44eece9d8f34c1a8a5a21934deb33-us21"
  }

  const request = https.request(url, options, function(response) {
    response.on("data", function(data) {
      //console.log(JSON.parse(data));
      if (response.statusCode === 200)
      {
        //const userData = JSON.parse(data);
        //const email = userData.new_members[0].email_address;
        //res.write("<h1>Success (" + email +" is enrolled)</h1>");
        //res.send("<h1>Success!</h1>");
        res.sendFile(__dirname + "/success.html");
      }
      else
      {
        //res.send("<h2>Failed (Server returns : " + response.statusCode + "</h2>");
        res.sendFile(__dirname + "/failure.html");
      }
    })
  });

  request.write(jsonData);
  request.end();
});

app.post("/failure", function(req, res) {
  res.redirect("/");
})

app.listen(process.env.PORT || 3000)
