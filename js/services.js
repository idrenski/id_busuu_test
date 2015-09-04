'use strict';

/* Services */

(function (angular) {
    'use strict';

    angular.module('myApp.services', [])

        .service('apiUserDataService', apiUserDataService)

    function apiUserDataService() {
        this.name = "Player 1";
        this.score = 0;

        this.getUsername = function () {
            return this.name;
        };

        this.setUsername = function (newName) {
            this.name = newName;
        };

        this.getScore = function () {
            return this.score;
        };

        this.setScore = function (newScore) {
            this.score = this.score + newScore;
        };

    }

})(angular);