/**
 * Created by robbynewman on 1/9/16.
 */

var express = require('express');
var router = express.Router();
var path = require('path');

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/basic_walking_skeleton');

//This creates a model
var Cat = mongoose.model('Cat', {name:String});

//The addCat function's request is handled here:
// .



router.post('/add', function(request, response) {
    //Is it like this is 'listening' to '/add',specifically
    // for post requests? .
    //
    // This creates a new object based on the Cat model.
    // The name of the new cat is request.body.name.
    // So does that mean that $scope.cat is packaged not as a
    // string but as a string inside an object inside an object?
    //
    // For instance, if you enter 'Otis' {body:{name:"Otis"}}.

    //This creates an instance of the mongoose model Cat, aka a 'document'
    var kitty = new Cat({name: request.body.name});
    console.log("kitty is ", kitty);

    //.save is a mongoose function that saves kitty to
    //the database.  Does it already know where to save it?
    // '/basic_walking_skeleton'?

    kitty.save(function (err) {
        //if (err) console.log('Meow err', err);


        response.send(kitty.toJSON());
       // next();
        });
});


//The prototype for request object is inherited  from
// http.IncomingMessage.prototype
//
// The prototype for response object is inherited from
// http.ServerResponse.prototype .

//This inheritance lets us call node functions
// from express apps.

// This is what you get from localhost:3000/add

// {"__v": 0,"_id": "56915fbf26b352b72590c541"}
//
//router.post('/add', function(request, response, next){
//    var kitty = new Cat({name:request.body.name});
//    kitt.save(function(err){
//        if(err){
//            console.log('Meow! Error: ', err);
//            response.send(kitty.toJSON());
//            next();
//        }
//    });
//});

// This handles get requests to /cats
// Its response is to send back the whole list of cats.
// But how it does that is mysterious to me.
// What is .find  and .exec
router.get('/cats', function(request, response, next){

    return Cat.find({}).exec(function(err,cats){
        if(err) throw new Error(err);
        //why no {} around 'throw new Error(err)'?
        // does the rule for conditionals not apply here?

        //I think this might be the heart of it.
        response.send(JSON.stringify(cats));
        next();
    });
});



//This is the data returned from '/cats'
//[{"_id":"56913489c4ced28020ffe70b","name":"Kat","__v":0},
// {"_id":"56913495c4ced28020ffe70c","name":"Moe","__v":0},
// {"_id":"569134e5dd5ab98e2078c3d3","name":"Bob","__v":0}]


// The initial request which is sent by simply entering localhost:3000
// on our browser is routed to this bit of code.

router.get('/', function(request, response, next) {
    // It responds by sending the file
    // public/views/index.html to the browser to display
    // .
    response.sendFile(path.join(__dirname, '../public/views/index.html'));

    //This passes control to the next matching route.
    // But there might not be one in this case.
           // next();

});

//This exports our router function as a Node module and
// makes it accessible from other files
module.exports = router;

