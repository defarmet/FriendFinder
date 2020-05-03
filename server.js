var path = require("path");
var express = require("express");

var PORT = process.env.PORT || 3826;
var app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json());

require("./app/routing/apiRoutes.js")(app);
require("./app/routing/htmlRoutes.js")(app, path);

app.listen(PORT, function() {
	console.log("App listening on PORT " + PORT);
});
