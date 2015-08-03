'use strict';

/* Controllers */

(function (angular) {
    'use strict';

    angular.module('myApp.controllers', ["myApp.services"])

        .controller('AppController', ['$scope',

            function ($scope, $http) {

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

        .controller('HomeController', ['$scope', 'apiUserDataService',

            function ($scope, apiUserDataService) {
            // write Ctrl here

            $scope.name = apiUserDataService.getUsername();

            console.log('HomeController');
        }])

        .controller('GameController', ['$scope', '$location', 'apiRandomFactory', 'apiUserDataService', 'apiAnswerFactory', 'words',

            function ($scope, $location, apiRandomFactory, apiUserDataService, apiAnswerFactory, words) {
                // write Ctrl here
                $scope.name = apiUserDataService.getUsername();
                $scope.score = apiUserDataService.getScore();


                $scope.init = function () {

                    $scope.idObj.idAnswer = -1;
                    $scope.idObj.randoms = [];
                    $scope.idObj.Question = null;
                    $scope.idObj.Answers = {};

                    var i = 0;
                    do {
                        var irandom = apiRandomFactory.getRandom(0, 10);
                        if ($scope.idObj.randoms.indexOf(irandom) < 0) {

                            $scope.idObj.randoms[i] = irandom;
                            if ($scope.idObj.Question == undefined) {
                                $scope.idObj.Question = {'def': words[irandom].def, 'en': words[irandom].en};
                            }
                            $scope.idObj.Answers[i] = {'es': words[irandom].es};

                            i++;
                        }
                    }
                    while (i < 3);
                };

                $scope.checkAnswer = function (Question, idAnswer) {
                    var idQuestion = apiAnswerFactory.getIdQuestion(Question);

                    if (idAnswer == idQuestion) {
                        apiUserDataService.setScore(1);
                        $scope.idObj.Round++;

                        if ($scope.idObj.Round > 3) {
                            $location.path('/highscore');
                            return true;
                        }

                        $scope.init();
                        $location.path('/game');
                        return true;

                    }
                    else {
                        $location.path('/highscore');
                        return false;
                    }

                };

                $scope.setPlayerName = function (pName) {
                    apiUserDataService.setUsername(pName);
                };

                $scope.idObj = {};
                $scope.idObj.Round = 1;
                $scope.init();

                console.log('GameController', $scope);
            }]);

})(angular);