'use strict';

/**
 * @ngdoc function
 * @name foodNinjaApp.controller:RecieptsCtrl
 * @description
 * # RecieptsCtrl
 * Controller of the foodNinjaApp
 */
angular.module('foodNinjaApp')
  .controller('RecieptsCtrl', function ($scope, Reciepts) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.reciepts = Reciepts.getReciepts();

  });
