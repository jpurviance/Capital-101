'use strict';

// Register `login` component, along with its associated controller and template
angular.
module('login').
component('login', {
    templateUrl: 'partials/login',
    controller: ['$scope','$location',
        function loginController($scope,$location) {
            // function to submit the form after all validation has occurred
            $scope.submitForm = function() {
                // check to make sure the form is completely valid
                if ($scope.loginForm.$valid) {
                    $location.path( 'required-documents' );
                }
                else{
                    console.log("Form Invalid");
                }

            };
        }
    ]
});