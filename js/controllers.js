'use strict';

/* Controllers */

(function (angular) {
    'use strict';

    angular.module('myApp.controllers', [])

        .controller('AppController', AppController)
        .controller('HomeController', HomeController)
        .controller('GameController', GameController)
        .controller('HighscoreController', HighscoreController)


    function AppController($scope, $http, apiDataFactory) {

        var vm = this;

        vm.generateResult = function () {

            /*          function getData(response) {

             /!*
             * 1. Create a PL/SQL package in ICLBANK which generates JSON; See example package ID_JSON_DATA
             *
             * 2. Grant execute permissions
             * grant execute on ID_JSON_DATA to DISPATCH; -- Oracle db command
             *
             * 3. Register alias in DYNAMAP
             * insert into DYNAMAP (DYN_ALIAS, DYN_ROUTINE, DYN_VALIDATE_CALLBACK, DYN_ROUTINE_PARAMS, DYN_AUTHENTICITY, DYN_RATING, DYN_CALLBACK_PARAMS, DYN_TRACE_LEVEL, DYN_RG_ALLOWED, DYN_TOKEN_CHECK, DYN_TSS_ALLOWED)
             * values ('id-json-data', 'id_json_data.get_account_list', 'id_json_data.get_account_list', 'N', 'C', 0, 'N', 'N', 'Y', 'N', 'N');
             *
             * 4. Change AJS code adding
             *  $http.get('https://new.dev.ingonline.intranet/bg/!UPR.Dispatcher?ps_redir_proc=id-json-data')
             *
             * 5. Open command line window and disable-web-security on Chrome
             * chrome.exe --user-data-dir="C:/Chrome dev session" --disable-web-security
             *
             * 6. Login in IOL
             *
             * 7. Open Bussu AngulaJS Test app
             *
             * 8. Go to API and execute it.
             *
             * 9. Check the response at Chrome Development Console (press F12)
             *!/


             * JSON DATA received:
             * {"result":
             *    [
             *        {"account":"9182989357","currency":"RON","origin":"ATL"},
             *        {"account":"9182989365","currency":"RON","origin":"ATL"}
             *    ]
             * }

             * Factory content
             * Begin*************************************
             * var ddata = response.data.result;
             *
             * for (var j = 0; j < ddata.length; j++) {
             * console.log('actual data:', ddata[j].origin + " " + ddata[j].account + " " + ddata[j].currency);
             * }
             * End*************************************
             */

            $http.get('js/api.js').
                then(
                function (response) {
                    // this callback will be called asynchronously
                    // when the response is available

                    console.log('AppController response', response);

                    vm.url = apiDataFactory.getURL(response);
                    vm.name = apiDataFactory.getData(response);


                }, function (response) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                    console.error("API failed!", response);
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