/**
 * Created by robbynewman on 1/9/16.
 */

var express = require('express');
var bodyParser = require('body-parser');
var index = require('./routes/index');


var app = express();
var path =require('path');


app.use(express.static(path.join(__dirname, './public')));


//app.get('/', function(request, response){
//    response.send('Hello!');
//});


var server = app.listen(3000, function(){
    var port = server.address().port;
    console.log('Listening on port: ', port);
});

app.use(bodyParser.json());

//When the app 'hears' a request from '/' or localhost:300
// The line below sends that request to index, which we've defined above.
// The code at '.routes/index' will handle the request.
// Put another way it 'calls on' the code from routes/index, which
// we've imported or required.
//
// Maybe this also directs any requests that fall under '/',
// like '/add' or '/cats' to index.
app.use('/', index);



//This exports our app function as a Node module and
// makes it accessible from other files
module.exports=app;


