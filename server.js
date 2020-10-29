const express = require('express');
const path = require('path');
var minifyHTML = require('express-minify-html');

const app = express();

app.set('views', './homepage/views');
// Views directory for static landing page is specified, in my case its homepage/views
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
//Above piece of code will simply minify my html before serving in the browser, removing comments,white spaces,empty attributes and minifying js also.

app.use(express.static(path.join(__dirname, 'homepage')));
//This will use static files from homepage folder in base directory. e.g the path formed in my case will be “my-app/homepage”
app.get("/", function(req, res) {
    res.render("index");
});
app.use(express.static(path.join(__dirname, 'build')));
//This will use files from the build folder in base directory. e.g the path formed in my case will be “my-app/build”.
app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
app.listen(9000, function () {
    console.log("Listening on port 9000")
});
