/**
 * Created by wrk224 on 7/7/16.
 */
'use strict';

// Register `issue` component, along with its associated controller and template
angular.
module('issue').
component('issue', {
    templateUrl: 'partials/issue',
    controller: ['$scope','$location','$http','$routeParams',
        function issueController($scope,$location,$http,$routeParams) {
            $scope.issue = {id:$routeParams.issueId};
        }
    ]
});/**
 * Created by wrk224 on 7/7/16.
 */
