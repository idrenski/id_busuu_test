'use strict';

/* Controllers */

(function (angular) {
    'use strict';

    angular.module('myApp.controllers', ["myApp.services"])

        .controller('AppCtrl', ['$scope',

            function ($scope, $http) {
                $scope.name = 'Iasen';

                /*            $http({
                 method: 'GET',
                 url: '/api/name'
                 })
                 .success(function (data, status, headers, config) {
                 $scope.name = data.name;
                 })

                 .error(function (data, status, headers, config) {
                 $scope.name = 'Error!'
                 });*/

                console.log('AppCtrl', $scope);

            }])

        .controller('HomeControl', ['$scope', 'apiRandomFactory', 'apiUserDataService', 'words',

            function ($scope, apiRandomFactory, apiUserDataService, words) {
                // write Ctrl here
                $scope.idRandom = apiRandomFactory.getRandom(0, 10);
                $scope.name = apiUserDataService.getUsername();
                $scope.idWords = words;

                console.log('The word ' + $scope.idRandom + ' is: ', $scope.idWords[$scope.idRandom].en, " <", $scope.idWords[$scope.idRandom].def, "> /", $scope.idWords[$scope.idRandom].es);

                console.log('HomeControl', $scope);
            }])

        .controller('MyCtrl2', function ($scope) {
            // write Ctrl here

            console.log('MyCtrl2', $scope);

        });

})(angular);