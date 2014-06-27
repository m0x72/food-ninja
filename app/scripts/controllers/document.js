'use strict';

/**
 * @ngdoc function
 * @name foodNinjaApp.controller:DocumentCtrl
 * @description
 * # DocumentCtrl
 * Controller of the foodNinjaApp
 */
angular.module('foodNinjaApp')
  .controller('DocumentCtrl', function ($scope, Giniapi, Documents, $routeParams, OAuth) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.document = Documents.getDocument($routeParams.id);
    $scope.token = OAuth.getToken();

  });
