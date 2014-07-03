'use strict';

/**
 * @ngdoc function
 * @name foodNinjaApp.controller:DocumentsCtrl
 * @description
 * # DocumentsCtrl
 * Controller of the foodNinjaApp
 */
angular.module('foodNinjaApp')
  .controller('DocumentsCtrl', function ($scope, Documents) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.documents = Documents.getDocuments();
    // $scope.deleteDoc = function(id) {
    // 	Documents.deleteDocument(id).then(function() {
    // 			$scope.documents = Documents.getDocuments();
    // 		}
    // 	);
    // };

  });
