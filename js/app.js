'use strict';

// Declare app level module which depends on filters, and services

(function (angular) {
    'use strict';

    angular.module('myApp', [
        'myApp.controllers',
        'myApp.filters',
        'myApp.services',
        'myApp.directives',
        'ngRoute'
    ])
        .config(function ($routeProvider, $locationProvider) {
            $routeProvider
                .when('/home', {
                    templateUrl: 'views/partials/home.html',
                    controller: 'HomeController'
                })
                .when('/game', {
                    templateUrl: 'views/partials/game.html',
                    controller: 'GameController'
                })
                .otherwise({
                    redirectTo: '/home'
                });

            $locationProvider.html5Mode(true);
        });

})(angular);