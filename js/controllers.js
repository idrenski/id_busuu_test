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
                // $scope.name = apiUserDataService.getUsername();

                $scope.checkAnswer = function (Question, idAnswer) {
                    var idQuestion = apiAnswerFactory.getIdQuestion(Question);

                    return (idAnswer == idQuestion)?true:false;
                };

                $scope.idObj = {};
                $scope.idObj.idAnswer = -1;
                $scope.idObj.randoms =[];
                //$scope.idObj.Question = {};
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

                console.log('GameController', $scope);
            }]);

})(angular);