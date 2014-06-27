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
    	
    	// Giniapi.documentUpload(formData).success(function(data, status, header, config) {
    	// 	console.log("succes: ", arguments);
    	// 	$scope.documentId = header('location').replace(/^https:\/\/api.gini.net\/documents\//, '');
    	// });
    	$scope.document = Giniapi.resDocument.save({}, formData);
    };

    $scope.getDocumentList = function() {
   		$scope.documents = Giniapi.resDocument.query();
    };

    $scope.getDocument = function() {
    	$scope.document.$get().then(function(data) {$scope.giniDocument = data;});
    };
    $scope.getDocumentLayout = function() {
    	$scope.giniDocumentLayout = Giniapi.resDocument.layout({documentId: $scope.document.id});
    };
    $scope.getDocumentExtractions = function() {
    	$scope.giniDocumentExtractions = Giniapi.resDocument.extractions({documentId: $scope.document.id});
    };

    	//var doc = new Giniapi.document({})
    	//Giniapi.document.save(formData);
  });
