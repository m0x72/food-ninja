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
    	
    	Giniapi.documentUpload(formData).success(function(data, status, header, config) {
    		console.log("succes: ", arguments);
    		$scope.documentId = header('location').replace(/^https:\/\/api.gini.net\/documents\//, '');
    	});

    $scope.getDocument = function() {
    	Giniapi.document($scope.documentId).success(function(data, status, header, config) {
    		$scope.giniDocument = data;
    		$scope.giniDocument = JSON.stringify($scope.giniDocument, undefined, 2);
    	});
    };
    $scope.getDocumentLayout = function() {
    	Giniapi.documentLayout($scope.documentId).success(function(data, status, header, config) {
    		$scope.giniDocumentLayout = data;
    		$scope.giniDocumentLayout = JSON.stringify($scope.giniDocumentLayout, undefined, 2);
    	});
    };
    $scope.getDocumentProcessed = function() {
    	Giniapi.documentProcessed($scope.documentId).success(function(data, status, header, config) {
    		$scope.giniDocumentProcessed = data;
    		$scope.giniDocumentProcessed = JSON.stringify($scope.giniDocumentProcessed, undefined, 2);
    	});
    };
    $scope.getDocumentExtractions = function() {
    	Giniapi.documentExtractions($scope.documentId).success(function(data, status, header, config) {
    		$scope.giniDocumentExtractions = data;
    		$scope.giniDocumentExtractions = JSON.stringify($scope.giniDocumentExtractions, undefined, 2);
    	});
    }

    	//var doc = new Giniapi.document({})
    	//Giniapi.document.save(formData);
    };
  });
