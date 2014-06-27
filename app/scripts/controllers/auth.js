'use strict';

/**
 * @ngdoc function
 * @name foodNinjaApp.controller:AuthCtrl
 * @description
 * # AuthCtrl
 * Controller of the foodNinjaApp
 */
angular.module('foodNinjaApp')
  .controller('AuthCtrl', function ($scope, OAuth) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.accessToken = OAuth.getToken();

    $scope.authenticate = function() {
    	OAuth.getTokenByPopup().then(function(params) {
    		console.log(params);
    		/*jshint camelcase: false */
    		OAuth.setToken(params.access_token);
    	});
    };

    //$scope.routeParams = $routeParams;

  });
