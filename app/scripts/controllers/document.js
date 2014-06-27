'use strict';

/**
 * @ngdoc function
 * @name foodNinjaApp.controller:DocumentCtrl
 * @description
 * # DocumentCtrl
 * Controller of the foodNinjaApp
 */
angular.module('foodNinjaApp')
  .controller('DocumentCtrl', function ($scope, Giniapi) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.document = null;
    $scope.uploadDocument = function() {
    	console.log('doc', $scope.document);
    	var formData = new FormData();
    	formData.append('file', $scope.document);
    	console.log('formdata', formData);
    	
    	Giniapi.documentUpload(formData);

    	//var doc = new Giniapi.document({})
    	//Giniapi.document.save(formData);
    };
  });
