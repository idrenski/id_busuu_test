'use strict';

/* Directives */


(function (angular) {
    'use strict';

    angular.module('myApp.directives', [])
        .directive('appVersion', function (version) {
            return function (scope, elm, attrs) {
                elm.text(version);
            };
        })

        .directive('questionTemplate', function () {
            return {
                restrict: 'E',
                replace: true,
                scope: {
                    idObj: '=',
                    checkAnswer: '&'
                },
                templateUrl: 'views/partials/partial1.html'
            };
        })

})(angular);