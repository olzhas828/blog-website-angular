var express = require("express");
var path = require("path");

var app = express();

var HTTP_PORT = process.env.PORT || 8080

app.use(express.static('./dist/web422-a4'));

// Redirect Users to "index.html" if route not accessed using client side routing
app.use((req, res) => {
    res.sendFile('index.html', {root: 'dist/web422-a4'});
});

app.listen(HTTP_PORT, ()=>{
    console.log("listening on port: " + HTTP_PORT);
});