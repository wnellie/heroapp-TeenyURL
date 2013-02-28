// This is the main TinyUrl app module

require('mootools');

var express = require('express');
var path = require('path');

var app = express();

app.configure(function() {
    app.use(express.favicon(path.join(__dirname, '/public/img/favicon.ico')));
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function() {
    app.use(express.errorHandler());
});

require('./routes/api').register(app);
require('./routes/redirect').register(app);

// environment variable VMC_APP_PORT will be defined when the app is
// running on Tempest cloud. The app must listen on this port otherwise
// the requests can't be routed.
var port = process.env.VMC_APP_PORT || 3000;
app.listen(port, function() {
    console.log("TinyUrl is listening on port " + port);
});
