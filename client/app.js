/**
 * Created by robbynewman on 1/9/16.
 */


var app = angular.module('app',[]);


app.controller("IndexController", ['$scope', '$http', function($scope, $http){
    //To start, cat is an empty object and cats is an empty array
    // .
    $scope.cat={};
    $scope.cats=[];


    var fetchCats=function(){
        // get request to '/cats'
        return $http.get('/cats').then(function(response){
            if(response.status !==200){
                throw new Error('Failed to fetch cats from the API');
            }
            $scope.cat={};

            //
            $scope.cats=response.data;
            console.log("Inside fetchCats function ...");
            console.log("$scope.cats is ", $scope.cats);

            return response.data;
        });
    };

    //
    //Activated by clicking the Save button;
    // because it has ng-click='addCat'
    $scope.addCat = function(){
        console.log("Inside $scope.addCat function...")
        console.log("$scope.cat is: ", $scope.cat);
        //It makes a request to '/add' which I guess is short
        // for 'localhost:3000/add'. $scope.cat (which should
        // be the string entered by user) is the data it sends.
        // What's done with that data is determined by the router.post
        // code in index.js.

        // then it does fetchCats()
        $http.post('/add', $scope.cat).then(fetchCats());
    }
}]);