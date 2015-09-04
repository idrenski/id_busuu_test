'use strict';

/* Directives */


(function (angular) {
    'use strict';

    angular.module('myApp.directives', [])

        .directive('appVersion', appVersion)
        .directive('questionTemplate', questionTemplate)

    function appVersion(version) {
        return function (scope, elm, attrs) {
            elm.text(version);
        };
    }

    function questionTemplate() {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                idObj: '=',
                checkAnswer: '&'
            },
            templateUrl: 'views/partials/partial1.html'
        };
    }

})(angular);