'use strict';

/**
 * @ngdoc function
 * @name foodNinjaApp.controller:DummytemplatesCtrl
 * @description
 * # DummytemplatesCtrl
 * Controller of the foodNinjaApp
 */
angular.module('foodNinjaApp')
  .controller('DummytemplatesCtrl', function ($scope, Reciepts) {
  	//dont delete awesomethings
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  /*
    $scope.products = [
    	{
    		name: 'Einhorn',
    		price: '0.01'
    	},
    	{
    		name: 'Einhörner',
    		price: '0.01'
    	},
    	{
    		name: 'Einhorn',
    		price: '0.05'
    	},
    	{
    		name: 'Einhorn',
    		price: '0.02'
    	}
    ]
  */
  $scope.reciepts = Reciepts.getReciepts();
  //console.log($scope.reciepts);
  });
