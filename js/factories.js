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


    apiRandomFactory.$inject = [];
    apiAnswerFactory.$inject = ['words'];

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

})(angular);