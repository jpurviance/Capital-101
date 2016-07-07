/**
 * Created by wrk224 on 7/7/16.
 */
'use strict';

// Register `issue` component, along with its associated controller and template
angular.
module('issue').
component('issue', {
    templateUrl: 'partials/issue',
    controller: ['$scope','$location','$http','$routeParams','$cacheFactory',
        function issueController($scope,$location,$http,$routeParams,$cacheFactory) {
            $scope.logOut = function () {
                $scope.cache.put("user",null);
            };
            $scope.resolve = function(){
                $http.post('/api/remove_issue', {token:42,customer_id:$scope.issueId}).then(function(res) {
                    $location.path('issues');
                    });
            };
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
            $scope.issueId = $routeParams.issueId;
            $scope.issue = {};
            $scope.customer = {};
            $http.post('/api/get_issue', {token:42,customer_id:$scope.issueId}).then(function(res) {
                console.log(res);
                $scope.issue = res.data.issue;
            });
            $http.post('/api/user', {token:42,user:$scope.issueId}).then(function(res) {
                $scope.customer = res.data.user;
            });

        }
    ]
});/**
 * Created by wrk224 on 7/7/16.
 */
