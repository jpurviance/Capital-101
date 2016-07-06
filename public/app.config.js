'use strict';

angular.
module('redBeanApp').
config(['$locationProvider' ,'$routeProvider',
    function config($locationProvider, $routeProvider) {
        $locationProvider.hashPrefix('!');

        $routeProvider.
        when('/login', {
            template: '<login></login>'
        }).
        otherwise('/login');
    }
]);