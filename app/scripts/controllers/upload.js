'use strict';

/**
 * @ngdoc function
 * @name foodNinjaApp.controller:UploadCtrl
 * @description
 * # UploadCtrl
 * Controller of the foodNinjaApp
 */
angular.module('foodNinjaApp')
  .controller('UploadCtrl', function ($scope, Documents, Giniapi, Reciepts, $q) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.state = "idle";

    $scope.uploadDocument = function() {
    	var formData = new FormData();
    	formData.append('file', $scope.upload.file);

    	$scope.state = "uploading";
    	$scope.document = Documents.uploadDocument(formData);
    	$scope.document.$promise.then(listenToProcessed, function(error){
            console.log("error", error);
            $scope.state = "Error uploading, retry"; 
    		//throw Error('Error uploading');
		});
    };

    var listenToProcessed = function(data) {
    	$scope.state = "waiting to be processed";
    	return Documents.getProcessedEvent(data.id).then(function(data){
    		$scope.document = data;
    		$scope.state = 'processed';
    		return getGiniData(data);
    	}, function(error) {
            console.log("error", error);
    		$scope.state = error;
    		throw Error('Error processing on gini');
    	}, function(notification) {
    		$scope.state = notification;
    	});
    };

    var processToReciept = function(data) {
        // discared currency for now
        var sum = data.exData.extractions.extractions.amountToPay ? data.exData.extractions.extractions.amountToPay.value.replace(/:[A-Z]+$/, "") : null;
        console.log(sum);
        var parsedReciept = Reciepts.parseReciept(data.exData.layout);
        $scope.recieptId = Reciepts.addReciept(data.docData.id, $scope.upload.title, parsedReciept, sum);
        $scope.reciept = Reciepts.getReciept($scope.recieptId);
        $scope.state = "reciept created";
    };

    var getGiniData = function(docData) {
        return $q.all({
            layout: Documents.getDocumentLayout(docData.id).$promise,
            extractions: Documents.getDocumentExtractions(docData.id).$promise
        }).then(
            function(exData) {
                $scope.state = "extractions retrieved from gini";
                processToReciept({docData: docData, exData: exData});
            },
            function(error) {
                console.log("error", error);
                $scope.state = "error retrieving doc layout";
                throw Error("error retrieving doc layout");
            }
        );
    };

    $scope.updateReciept = function(id, reciept) {
    	console.log('updateReciept', id, reciept);
    	Reciepts.updateReciept(id, reciept);
    };

  });
