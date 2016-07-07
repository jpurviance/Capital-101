'use strict';

// Register `login` component, along with its associated controller and template
angular.
module('login').
component('login', {
    templateUrl: 'partials/login',
    controller: ['$scope','$location','$http','$cacheFactory',
        function loginController($scope,$location,$http,$cacheFactory) {
            if(!$cacheFactory.get('session')){
                $scope.cache = $cacheFactory('session');
            }
            else {
                $scope.cache = $cacheFactory.get('session');
            }
            if($scope.cache.get("user")){
                $location.path('issues');
            }
            $scope.login = {token:42, email:'',password:'',fb_token:null};
            // function to submit the form after all validation has occurred
            $scope.submitForm = function() {
                // check to make sure the form is completely valid
                console.log($scope.login);
                if ($scope.loginForm.$valid) {
                    $http.post('/api/user/auth', $scope.login).then(function(res){
                        console.log(res);
                        $scope.cache.put("user", res.data.user);
                        $location.path('issues');
                    },function(res){
                        console.log('an error ocurred');
                        console.log(res);
                    })
                }
                else{
                    console.log("Form Invalid");
                }

            };
        }
    ]
});