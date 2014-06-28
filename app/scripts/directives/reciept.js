'use strict';

/**
 * @ngdoc directive
 * @name foodNinjaApp.directive:reciept
 * @description
 * # reciept
 */
angular.module('foodNinjaApp')
  .directive('reciept', function () {
    return {
      templateUrl: 'views/partials/reciept.html',
      restrict: 'E',
      scope: {
      	reciept: '=',
      	recieptId: '='
      },
      link: function postLink(scope, element, attrs) {
        //
      }
    };
  });
