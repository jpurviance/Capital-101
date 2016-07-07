'use strict';

// Register `issues` component, along with its associated controller and template
angular.
module('issues').
component('issues', {
    templateUrl: 'partials/issues',
    controller: ['$scope','$location','$http','$cacheFactory',
        function issuesController($scope,$location,$http,$cacheFactory) {
            $scope.tickets = [];
            $scope.reals = [];
            if(!$cacheFactory.get('session')){
                $scope.cache = $cacheFactory('session');
            }
            else {
                $scope.cache = $cacheFactory.get('session');
            }
            if(!$scope.cache.get("user")){
                $location.path('login');
            }
            $scope.user = $scope.cache.get("user");
            $http.post('/api/line', {token:42}).then(function(res){
                $scope.tickets = res.data.line;
                console.log($scope.tickets);
                angular.forEach($scope.tickets,function(value){
                    var x = this;
                    $http.post('/api/user', {token:42,user:value.customer_id}).then(function(res){
                        console.log(res);
                        value.customer = res.data.user;
                        $scope.reals.push(value);
                    },function(res){
                        console.log('an error ocurred');
                        console.log(res);
                    });
                });
            },function(res){
                console.log('an error ocurred');
                console.log(res);
            });
            $scope.logOut = function () {
                console.log("Logging Out");
                $scope.cache.put("user",null);
                $location.path('login');
            };
            $scope.openIssue = function(issue){
                    $location.path('issue/' + issue.customer_id);
            };
            $scope.issues = {};
            console.log('LOADED');
        }
    ]
});/**
 * Created by wrk224 on 7/7/16.
 */
