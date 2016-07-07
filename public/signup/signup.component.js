/**
 * Created by wrk224 on 7/6/16.
 */
'use strict';

// Register `signup` component, along with its associated controller and template
angular.
module('signup').
component('signup', {
    templateUrl: 'partials/signup',
    controller: ['$scope','$location','$http',
        function signupController($scope,$location,$http) {
            $scope.user={name:'',email:'',password:'',profilePicture:'',type:'ambassador'};

            $scope.video = document.getElementById("video");
            var videoObj = { "video": true };
            var errBack = function(error) {
                    console.log("Video capture error: ", error.code);
            };

            // Put video listeners into place
            if(navigator.getUserMedia) { // Standard
                navigator.getUserMedia(videoObj, function(stream) {
                    video.src = stream;
                    video.play();
                }, errBack);
            } else if(navigator.webkitGetUserMedia) { // WebKit-prefixed
                navigator.webkitGetUserMedia(videoObj, function(stream){
                    video.src = window.webkitURL.createObjectURL(stream);
                    video.play();
                }, errBack);
            }
            else if(navigator.mozGetUserMedia) { // Firefox-prefixed
                navigator.mozGetUserMedia(videoObj, function(stream){
                    video.src = window.URL.createObjectURL(stream);
                    video.play();
                }, errBack);
            }
            $scope.takepic = function(){
                var canvas = document.createElement("canvas");
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
                canvas.getContext('2d')
                    .drawImage($scope.video, 0, 0, canvas.width, canvas.height);
                $scope.user.profilePicture = canvas.toDataURL();
            };
            $scope.submitForm = function() {
                // check to make sure the form is completely valid
                if ($scope.signupForm.$valid) {
                    $http.post('/api/user/create', {token:42,user:$scope.user}).then(function(res){
                        console.log(res);
                        $location.path('login');
                    },function(){
                        console.log('an error ocurred');
                    });
                }
                else{
                    console.log("Form Invalid");
                }

            };
        }
    ]
});