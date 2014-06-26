'use strict';

/**
 * @ngdoc function
 * @name foodNinjaApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the foodNinjaApp
 */
angular.module('foodNinjaApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
