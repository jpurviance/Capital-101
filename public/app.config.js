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
        when('/signup', {
            template: '<signup></signup>'
        }).
        otherwise('/login');
    }
]);