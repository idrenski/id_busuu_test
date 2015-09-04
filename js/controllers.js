'use strict';

/* Controllers */

(function (angular) {
    'use strict';

    angular.module('myApp.controllers', [])

        .controller('AppController', AppController)
        .controller('HomeController', HomeController)
        .controller('GameController', GameController)
        .controller('HighscoreController', HighscoreController)


    function AppController($scope, $http, apiUserDataService) {

        var vm = this;

        vm.generateResult = function () {

            $http.get('js/api.js').
                then(
                function (response) {
                    // this callback will be called asynchronously
                    // when the response is available
                    vm.name = '{result: {' +
                        'name: "' + apiUserDataService.getUsername() + '", ' +
                        'score: "' + apiUserDataService.getScore() + '"' +
                        '}}'


                    /* Download file only */
                    var blob = new Blob([vm.name], {type: 'text/plain'});
                    vm.url = (window.URL || window.webkitURL).createObjectURL(blob);

                    console.log('AppController', $scope);

                }, function (response) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                    alert("API failed!");
                }
            );
        };


        vm.divVisible = false;
        vm.generateResult();
        vm.divVisible = true;

        console.log('AppController', $scope);
    }


    function HomeController($scope, apiUserDataService) {
        // write Ctrl here

        var vm = this;
        vm.name = apiUserDataService.getUsername();

        console.log('HomeController', $scope);
    }


    function GameController($scope, $location, apiRandomFactory, apiUserDataService, apiAnswerFactory, words) {
        // write Ctrl here
        var vm = this;

        vm.name = apiUserDataService.getUsername();
        vm.score = apiUserDataService.getScore();


        vm.init = function () {

            vm.idObj.idAnswer = -1;
            vm.idObj.randoms = [];
            vm.idObj.Question = null;
            vm.idObj.Answers = {};

            var i = 0;
            var qrandom = apiRandomFactory.getRandom(0, 2);

            do {
                var irandom = apiRandomFactory.getRandom(0, 10);
                if (vm.idObj.randoms.indexOf(irandom) < 0) {

                    vm.idObj.randoms[i] = irandom;
                    if (i == qrandom) {
                        vm.idObj.Question = {'def': words[irandom].def, 'en': words[irandom].en};
                    }
                    vm.idObj.Answers[i] = {'es': words[irandom].es};

                    i++;
                }
            }
            while (i < 3);
        };

        vm.checkAnswer = function (Question, idAnswer) {
            var idQuestion = apiAnswerFactory.getIdQuestion(Question);

            if (idAnswer == idQuestion) {
                apiUserDataService.setScore(1);
                vm.idObj.Round++;

                if (vm.idObj.Round > 3) {
                    $location.path('/highscore');
                    return true;
                }

                vm.init();
                $location.path('/game');
                return true;

            }
            else {
                $location.path('/highscore');
                return false;
            }

        };

        vm.idObj = {};
        vm.idObj.Round = 1;
        vm.init();

        console.log('GameController', $scope);
    }


    function HighscoreController($scope, $location, apiUserDataService) {
        // write Ctrl here
        var vm = this;

        vm.redirectMe = function () {
            $location.path('/api');
        };

        vm.setPlayerName = function (pName) {
            apiUserDataService.setUsername(pName);
        };

        vm.name = apiUserDataService.getUsername();
        vm.score = apiUserDataService.getScore();

        console.log('HighscoreController', $scope);
    }

})
(angular);