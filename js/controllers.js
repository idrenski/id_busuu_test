'use strict';

/* Controllers */

(function (angular) {
    'use strict';

    angular.module('myApp.controllers', ["myApp.services"])

        .controller('AppController',

        function ($scope, $http, apiUserDataService) {

            $scope.downloadResult = function () {

                $http.get('/api.js').
                    then(
                    function (response) {
                        // this callback will be called asynchronously
                        // when the response is available
                        $scope.result = 'Player: ' + apiUserDataService.getUsername() + " with score: " + apiUserDataService.getScore();
                        console.log('AppController', $scope);

                    }, function (response) {
                        // called asynchronously if an error occurs
                        // or server returns response with an error status.
                        alert("AJAX failed!");
                    }
                );
            }
        })

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
                    var qrandom = apiRandomFactory.getRandom(0, 2);

                    do {
                        var irandom = apiRandomFactory.getRandom(0, 10);

                        if ($scope.idObj.randoms.indexOf(irandom) < 0) {

                            $scope.idObj.randoms[i] = irandom;
                            if ((i == qrandom)) {
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

})
(angular);