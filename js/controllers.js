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

                // console.log('AppController', $scope);

            }])

        .controller('HomeController', function () {
            // write Ctrl here

            console.log('HomeController');
        })

        .controller('GameController', ['$scope', 'apiRandomFactory', 'apiUserDataService', 'apiAnswerFactory', 'words',

            function ($scope, apiRandomFactory, apiUserDataService, apiAnswerFactory, words) {
                // write Ctrl here
                $scope.name = apiUserDataService.getUsername();

                $scope.checkAnswer = function (idQuestion, Answer) {
                    var correctAnswer = apiAnswerFactory.getAnswer(idQuestion, words);

                    if (correctAnswer.toLowerCase() == Answer.toLowerCase()) {

                        return true
                    }
                    else {
                        return false
                    }
                };

                $scope.idObj = {};
                $scope.idObj.randoms = [];
                $scope.idObj.sentences = {};


                var i = 0;
                do {
                    var irandom = apiRandomFactory.getRandom(0, 10);
                    if ($scope.idObj.randoms.indexOf(irandom) < 0) {

                        $scope.idObj.randoms[i] = irandom;
                        $scope.idObj.sentences[i] = {'def': words[irandom].def, 'en': words[irandom].en};
                        i++;
                    }
                }
                while (i < 3);

                console.log('GameController', $scope);
            }]);

})(angular);