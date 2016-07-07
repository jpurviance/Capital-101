'use strict';

// Register `issues` component, along with its associated controller and template
angular.
module('issues').
component('issues', {
    templateUrl: 'partials/issues',
    controller: ['$scope','$location','$http','$cacheFactory',
        function issuesController($scope,$location,$http,$cacheFactory) {
            $scope.tickets = [];
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
                for(let i=0;i<$scope.tickets.length;++i){
                    $http.post('/api/line', {token:42,user:$scope.tickets[i].customer_id}).then(function(res){
                        $scope.tickets[i].customer = res.data.user;
                    },function(res){
                        console.log('an error ocurred');
                        console.log(res);
                    });
                }
            },function(res){
                console.log('an error ocurred');
                console.log(res);
            });
            $scope.logOut = function () {
                console.log("Logging Out");
                $scope.cache.put("user",null);
                $location.path('login');
            };
            $scope.issues = {};
            console.log('LOADED');
        }
    ]
});/**
 * Created by wrk224 on 7/7/16.
 */
