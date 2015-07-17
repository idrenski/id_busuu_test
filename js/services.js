'use strict';

/* Services */

(function (angular) {
    'use strict';

    angular.module('myApp.services', [])

        .factory('apiRandomFactory', [ function () {
            var sResult = {};

            sResult.getRandom = function (min, max) {
                return Math.floor((Math.random()) * (max - min + 1)) + min;
            };

            return sResult;
        }])

        .factory('apiAnswerFactory', ['words', function (words) {
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
        }])

        .service('apiUserDataService', function () {
            this.name = "";

            this.getUsername = function () {
                return this.name;
            };

            this.setUsername = function (newName) {
                this.name = newName;
            };

        })


        .value('words', [{
            "en": "Good morning",
            "es": "Buenos días",
            def: "A conventional expression of greeting or farewell used in the morning."
        }, {
            "en": "Apple",
            "es": "Manzana",
            def: "The round fruit of an apple tree, which typically has thin green or red skin."
        }, {
            "en": "Brother",
            "es": "Hermano",
            def: "A man or boy in relation to other sons and daughters of his parents."
        }, {
            "en": "Red",
            "es": "Rojo",
            def: "The colour of blood, fire, or rubies."
        }, {
            "en": "Germany",
            "es": "Alemania",
            def: "A country in central Europe whose capital is Berlin. "
        }, {
            "en": "Seven",
            "es": "Siete",
            def: "A number equivalent to the sum of three and four."
        }, {
            "en": "Learn",
            "es": "Aprender",
            def: "Gain or acquire knowledge in something by study, experience, or being taught."
        }, {
            "en": "Sun",
            "es": "Sol",
            def: "The star round which the earth orbits."
        }, {
            "en": "House",
            "es": "Casa",
            def: "A building for human habitation."
        }, {
            "en": "Young",
            "es": "Joven",
            def: "Having lived or existed for only a short time."
        }, {
            "en": "Friendly",
            "es": "Amigable",
            def: "Kind and pleasant."
        }]);

})(angular);