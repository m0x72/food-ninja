'use strict';

/**
 * @ngdoc directive
 * @name foodNinjaApp.directive:navBar
 * @description
 * # navBar
 */
angular.module('foodNinjaApp')
  .directive('navBar', function ($location) {
    return {
      templateUrl: 'views/partials/navBar.html',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
      	scope.isActive = function(loc) {
      		return loc === $location.path();
      	};
      }
    };
  });
