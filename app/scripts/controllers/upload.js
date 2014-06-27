'use strict';

/**
 * @ngdoc function
 * @name foodNinjaApp.controller:UploadCtrl
 * @description
 * # UploadCtrl
 * Controller of the foodNinjaApp
 */
angular.module('foodNinjaApp')
  .controller('UploadCtrl', function ($scope, Documents, Giniapi) {
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
    	$scope.document.$promise.then(listenToProcessed, function(){$scope.state = "Error uploading, retry";});
    };

    var listenToProcessed = function(data) {
    	$scope.state = "waiting to be processed";
    	Documents.getProcessedEvent(data.id).then(function(data){
    		$scope.document = data;
    		$scope.state = 'processed'
    	}, function(error) {
    		$scope.state = error;
    	}, function(notification) {
    		$scope.state = notification;
    	});
    };

  });
