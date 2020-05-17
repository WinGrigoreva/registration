let dbclient = require("mongodb").MongoClient,
    express = require("express"),
    bodyParser = require("body-parser");

let app = express(),
    urlParser = bodyParser.urlencoded({extended: false});

app.use(express.static(__dirname + "/public"));
jj
app.listen(600, function(){
    console.log("Сервер запущен!");
});

app.get("/", function(request, response){
    response.sendFile(__dirname + "/public/index.html");
});

app.post("/addhuman", urlParser, function(request, response){
    dbclient.connect("mongodb://localhost", {useUnifiedTopology: true}, function(err, client){
        let mydb = client.db("mydatabase"),
            humans = mydb.collection("humans");
            humans.insertOne(request.body, function(){
                client.close();
                response.redirect("/records.html");
            });
    });
});

app.post("/gethumans", function(request, response){
    dbclient.connect("mongodb://localhost", {useUnifiedTopology: true}, function(err, client){
        let mydb = client.db("mydatabase"),
            humans = mydb.collection("humans");
        humans.find().toArray(function(err, arr){
            response.json(arr);
            client.close();
        });
    });
});

app.post("/findhumans", urlParser, function(request, response){
    dbclient.connect("mongodb://localhost", {useUnifiedTopology: true}, function(err, client){
        let mydb = client.db("mydatabase"),
            humans = mydb.collection("humans");
            humans.find({$and : [{name: request.body.name},{age: request.body.age}]}).toArray(function(err, arr){
            response.json(arr);
            client.close();
        });
    });
});










