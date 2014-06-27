'use strict';

/**
 * @ngdoc function
 * @name foodNinjaApp.controller:UploadCtrl
 * @description
 * # UploadCtrl
 * Controller of the foodNinjaApp
 */
angular.module('foodNinjaApp')
  .controller('UploadCtrl', function ($scope, Documents, Giniapi, Reciepts) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.state = "idle";

    $scope.uploadDocument = function() {
    	var formData = new FormData();
    	formData.append('file', $scope.file);

    	$scope.state = "uploading";
    	$scope.document = Documents.uploadDocument(formData);
    	$scope.document.$promise.then(
    		listenToProcessed, 
    		function(){
	    		$scope.state = "Error uploading, retry"; 
	    		throw Error('Error uploading');
    		}
    	).then(
    		processToReciept
    	);
    };

    var listenToProcessed = function(data) {
    	$scope.state = "waiting to be processed";
    	return Documents.getProcessedEvent(data.id).then(function(data){
    		$scope.document = data;
    		$scope.state = 'processed';
    		return data;
    	}, function(error) {
    		$scope.state = error;
    		throw Error('Error processing on gini');
    	}, function(notification) {
    		$scope.state = notification;
    	});
    };

    var processToReciept = function(data) {
    	return Documents.getDocumentLayout(data.id).$promise.then(function(data) {
    		console.log('doc layout', data);
	    	Reciepts.addReciept(Reciepts.parseReciept(data));
	    	$scope.reciepts = Reciepts.getReciepts();	
    	}, function(error) {
    		$scope.state = "error retrieving doc layout";
    		throw Error("error retrieving doc layout");
    	});
    }

  });
