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
            if(!$cacheFactory.get('session')){
                $scope.cache = $cacheFactory('session');
            }
            else {
                $scope.cache = $cacheFactory.get('session');
            }
            if(!$scope.cache.get("user")){
                $location.path('login');
            }
            
            $scope.logOut = function () {
                $scope.cache.put("user",null);
            };
            $scope.issue = {id:$routeParams.issueId};
        }
    ]
});/**
 * Created by wrk224 on 7/7/16.
 */
