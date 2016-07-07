'use strict';

// Register `issues` component, along with its associated controller and template
angular.
module('issues').
component('issues', {
    templateUrl: 'partials/issues',
    controller: ['$scope','$location','$http',
        function issuesController($scope,$location,$http) {
            $scope.issues = {};
            console.log('LOADED');
        }
    ]
});/**
 * Created by wrk224 on 7/7/16.
 */
