var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

// // sets up the Express app
// var app = express();
// var PORT = process.env.PORT || 8080;

// Link in html and api routes
var apiRoutes = require("./app/routing/apiRoutes");
var htmlRoutes = require('./app/routing/htmlRoutes');

// sets up the Express app
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({ type:'application/vnd.api+json' }));

apiRoutes(app);
htmlRoutes(app);

// apiRoutes("./app/routing/apiRoutes.js")(app);
// htmlRoutes("./app/routing/htmlRoutes.js")(app);

//starts the server to begin listening
app.listen(PORT, function(){
    console.log("App listening on PORT: " * PORT);
});
