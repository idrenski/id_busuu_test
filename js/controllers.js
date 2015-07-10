'use strict';

/* Controllers */

(function (angular) {
    'use strict';

    angular.module('myApp.controllers', ["myApp.services"])

        .controller('AppController', ['$scope',

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

                console.log('AppController', $scope);

            }])

        .controller('HomeController', ['$scope', 'apiRandomFactory', 'apiUserDataService', 'words',

            function ($scope, apiRandomFactory, apiUserDataService, words) {
                // write Ctrl here
                $scope.name = apiUserDataService.getUsername();

                $scope.checkAnswer = function (idQuestion, Answer) {
                    if (lowercase($scope.idObj.sentences[idQuestion].es) == lowercase(Answer)) {
                        return true
                    }
                    else {
                        return false
                    }
                };

                $scope.idObj = {};
                $scope.idObj.randoms = [];
                $scope.idObj.sentences = [];

                var i = 0;
                do {
                    var irandom = apiRandomFactory.getRandom(0, 10);
                    if ($scope.idObj.randoms.indexOf(irandom) > -1) {
                        continue;
                    }
                    else {
                        $scope.idObj.randoms[i] = irandom;
                        $scope.idObj.sentences[i] = words[irandom];
                        i++;
                    }
                }
                while (i < 3);

                console.log('HomeController', $scope);
            }])

        .controller('GameController', function ($scope) {
            // write Ctrl here

            console.log('GameController', $scope);

        });

})(angular);