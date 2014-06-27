'use strict';

/**
 * @ngdoc function
 * @name foodNinjaApp.controller:AuthcallbackCtrl
 * @description
 * # AuthcallbackCtrl
 * Controller of the foodNinjaApp
 */
angular.module('foodNinjaApp')
  .controller('AuthcallbackCtrl', function ($scope, $routeParams, $window, $location, $timeout) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    console.log($location.path());

    $scope.authSuccess = false;
    $scope.closingTimeout = 5000;

    /*jshint camelcase: false */
    if (typeof $routeParams.access_token !== 'undefined') {
    	$scope.authSuccess = true;
    	$window.opener.postMessage( $routeParams, $window.location.protocol + '//' + $window.location.hostname + ($window.location.port ? ':' + $window.location.port : '') );
    	$timeout(function(){
    		$window.close();
    	}, $scope.closingTimeout);
    }

  });
