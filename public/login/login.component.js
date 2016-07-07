'use strict';

// Register `login` component, along with its associated controller and template
angular.
module('login').
component('login', {
    templateUrl: 'partials/login',
    controller: ['$scope','$location','$http',
        function loginController($scope,$location,$http) {
            $scope.login = {token:42,email:'',password:''};
            // function to submit the form after all validation has occurred
            $scope.submitForm = function() {
                // check to make sure the form is completely valid
                if ($scope.loginForm.$valid) {
                    $http.post('/api/user/auth', $scope.login).then(function(res){
                        console.log(res);
                    },function(){
                        console.log('an error ocurred');
                    })
                }
                else{
                    console.log("Form Invalid");
                }

            };
        }
    ]
});