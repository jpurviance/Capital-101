'use strict';

// Register `issues` component, along with its associated controller and template
angular.
module('issues').
component('issues', {
    templateUrl: 'partials/issues',
    controller: ['$scope','$location','$http','$cacheFactory',
        function issuesController($scope,$location,$http,$cacheFactory) {
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
            $scope.logOut = function () {
                console.log("Logging Out");
                $scope.cache.put("user",null);
                $location.path('login');
            }
            $scope.issues = {};
            console.log('LOADED');
        }
    ]
});/**
 * Created by wrk224 on 7/7/16.
 */
