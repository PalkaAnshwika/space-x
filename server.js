const express = require('express');
const path = require('path');
var minifyHTML = require('express-minify-html');

const app = express();

app.set('views', './homepage/views');
app.use(
    minifyHTML({
        override: true,
        exception_url: false,
        htmlMinifier: {
            removeComments: true,
            collapseWhitespace: true,
            collapseBooleanAttributes: true,
            removeAttributeQuotes: true,
            removeEmptyAttributes: true,
            minifyJS: true,
        },
    })
);

app.use(express.static(path.join(__dirname, 'homepage')));
app.get("/", function(req, res) {
    res.render("index");
});
app.use(express.static(path.join(__dirname, 'build')));
app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
app.listen(9000, function () {
    console.log("Listening on port 9000")
});
