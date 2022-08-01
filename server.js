const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
var dataBase = mongoose.connection;

var app = express();
const port = 7878;
app.use(bodyParser.json());
app.use(express.static('view'));

app.use(bodyParser.urlencoded({
    extended: true
}))

mongoose.connect("mongodb://localhost:27017/User-message", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.get('/text', (req, res) => {
    let texts = [];
    dataBase.collection('users').find()
        .forEach(text => texts.push(text))
        .then(() => {
            res.status(200).json(texts)

        }).catch(() => {
            res.status(500).json({ error: 'could not fetch document' })
        })
})
app.post("/success", (req, res) => {
    let name = req.body.name;
    let text = req.body.text;
    
    console.log(name);

    var data = {
        "name": name,
        "text": text,
     
    }

    dataBase.collection('users').insertOne(data, (err) => {
        if (err) {
            throw err;
        }
        console.log("Record Inserted Successfully")
    });
    return res.redirect('index.html');
})

app.get("/", (req, res) => {
    return res.redirect('index.html');
}).listen(port);
console.log("Listening on ",port);




