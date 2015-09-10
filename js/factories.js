/**
 * Created by idrenski on 9/3/2015.
 */
'use strict';

/* Factories */

(function (angular) {
    'use strict';

    angular.module('myApp.factories', [])

        .config(['$compileProvider',
            function ($compileProvider) {
                $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|tel|file|blob):/);
            }])

        .factory('apiRandomFactory', apiRandomFactory)
        .factory('apiAnswerFactory', apiAnswerFactory)
        .factory('apiDataFactory', apiDataFactory);

    apiRandomFactory.$inject = [];
    apiAnswerFactory.$inject = ['words'];
    apiDataFactory.$inject = ['apiUserDataService'];

    function apiRandomFactory() {
        var sResult = {};

        sResult.getRandom = function (min, max) {
            return Math.floor((Math.random()) * (max - min + 1)) + min;
        };

        return sResult;
    }

    function apiAnswerFactory(words) {
        var sResult = {};

        sResult.getAnswer = function (pos) {
            return words[pos].es;
        };

        sResult.getIdQuestion = function (defQuestion) {

            for (var i = 0; i < 11; i++) {
                if (words[i].def == defQuestion) {
                    return i;
                }
            }
            return -1;
        };

        return sResult;
    }


    function apiDataFactory(apiUserDataService) {
        var sResult = {};

        function SetData() {
            var name;
            name = '{result: {' +
                'name: "' + apiUserDataService.getUsername() + '", ' +
                'score: "' + apiUserDataService.getScore() + '"' +
                '}}';

            return name;
        }

        sResult.getURL = function () {
            var name;
            var url;

            name = SetData();

            /* Download file only */
            var blob = new Blob([name], {type: 'text/plain'});
            url = (window.URL || window.webkitURL).createObjectURL(blob);

            return url;

        };

        sResult.getData = function () {
            return SetData();

        };

        return sResult;
    }

})(angular);