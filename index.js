const express = require('express')
const app = express()
app.use(express.static("public"));

app.get('/', (req, res) => {
    //console.log("Just got a request!")
    //res.send('<h1>Welcome you!')
    res.sendFile(__dirname + "/signup.html");
})
app.listen(process.env.PORT || 3000)
