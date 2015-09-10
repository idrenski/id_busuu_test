'use strict';

/* Services */

(function (angular) {
    'use strict';

    angular.module('myApp.services', [])

        .service('apiUserDataService', apiUserDataService);

    function apiUserDataService() {
        var vm = this;

        vm.name = "Player 1";
        vm.score = 0;

        vm.getUsername = function () {
            return vm.name;
        };

        vm.setUsername = function (newName) {
            vm.name = newName;
        };

        vm.getScore = function () {
            return vm.score;
        };

        vm.setScore = function (newScore) {
            vm.score = vm.score + newScore;
        };

    }

})(angular);