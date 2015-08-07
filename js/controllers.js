'use strict';

/* Controllers */

(function (angular) {
    'use strict';

    angular.module('myApp.controllers', ["myApp.services"])

        .controller('AppController',

        function ($scope, $http, apiUserDataService) {

            this.generateResult = function () {

                $http.get('js/api.js').
                    then(
                    function (response) {
                        // this callback will be called asynchronously
                        // when the response is available
                        this.result =

                            '{result: {' +
                            'name: "' + apiUserDataService.getUsername() + '", ' +
                            'score: "' + apiUserDataService.getScore() + '"' +
                            '}}'


                        /* Download file only */
                        var blob = new Blob([this.result], {type: 'text/plain'});
                        this.url = (window.URL || window.webkitURL).createObjectURL(blob);

                        console.log('AppController', $scope);

                    }, function (response) {
                        // called asynchronously if an error occurs
                        // or server returns response with an error status.
                        alert("API failed!");
                    }
                );
            }

        })

        .controller('HomeController', ['$scope', 'apiUserDataService',

            function ($scope, apiUserDataService) {
                // write Ctrl here

                this.name = apiUserDataService.getUsername();

                console.log('HomeController', $scope);
            }])

        .controller('GameController', ['$scope', '$location', 'apiRandomFactory', 'apiUserDataService', 'apiAnswerFactory', 'words',

            function ($scope, $location, apiRandomFactory, apiUserDataService, apiAnswerFactory, words) {
                // write Ctrl here
                this.name = apiUserDataService.getUsername();
                this.score = apiUserDataService.getScore();


                this.init = function () {

                    this.idObj.idAnswer = -1;
                    this.idObj.randoms = [];
                    this.idObj.Question = null;
                    this.idObj.Answers = {};

                    var i = 0;
                    var qrandom = apiRandomFactory.getRandom(0, 2);

                    do {
                        var irandom = apiRandomFactory.getRandom(0, 10);
                        if (this.idObj.randoms.indexOf(irandom) < 0) {

                            this.idObj.randoms[i] = irandom;
                            if (i == qrandom) {
                                this.idObj.Question = {'def': words[irandom].def, 'en': words[irandom].en};
                            }
                            this.idObj.Answers[i] = {'es': words[irandom].es};

                            i++;
                        }
                    }
                    while (i < 3);
                };

                this.checkAnswer = function (Question, idAnswer) {
                    var idQuestion = apiAnswerFactory.getIdQuestion(Question);

                    if (idAnswer == idQuestion) {
                        apiUserDataService.setScore(1);
                        this.idObj.Round++;

                        if (this.idObj.Round > 3) {
                            $location.path('/highscore');
                            return true;
                        }

                        this.init();
                        $location.path('/game');
                        return true;

                    }
                    else {
                        $location.path('/highscore');
                        return false;
                    }

                };

                this.idObj = {};
                this.idObj.Round = 1;
                this.init();

                console.log('GameController', $scope);
            }])

        .controller('HighscoreController', ['$scope', 'apiUserDataService',

            function ($scope, apiUserDataService) {
                // write Ctrl here
                this.setPlayerName = function (pName) {
                    apiUserDataService.setUsername(pName);
                };

                this.name = apiUserDataService.getUsername();
                this.score = apiUserDataService.getScore();

                console.log('HighscoreController', $scope);
            }]);

})
(angular);