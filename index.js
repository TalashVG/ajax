const express = require('express');
var bodyParser = require('body-parser');
const app = express();
const fs=require("fs")

app.listen(3000);

app.use(express.static('public'));

var urlencodedParser = bodyParser.urlencoded({extended: false})

app.get('/user', urlencodedParser, (req, reply) => {
    console.log(req.body.data + " **Get");
    reply.status(200).send("user get is delivered");
});

app.post('/user', urlencodedParser,(req, reply)=>{
    if(req.header["user-agent"] != "Safari/537.36"){
        var fileContent = fs.readFileSync("test.txt", "utf8");
        fs.writeFileSync("test.txt", fileContent + req.body.data + "\n",  "ascii")
        reply.status(200). send("Your name is: " + req.body.data + ". It was written in file.");
    }else{
        console. log("chrome want to accesst access is denied")
    }
});
