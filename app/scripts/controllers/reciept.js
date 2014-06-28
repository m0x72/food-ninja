'use strict';

/**
 * @ngdoc function
 * @name foodNinjaApp.controller:RecieptCtrl
 * @description
 * # RecieptCtrl
 * Controller of the foodNinjaApp
 */
angular.module('foodNinjaApp')
  .controller('RecieptCtrl', function ($scope, $routeParams, Reciepts) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.reciept = Reciepts.getReciept($routeParams.id);
    $scope.recieptId = $routeParams.id;

  });
