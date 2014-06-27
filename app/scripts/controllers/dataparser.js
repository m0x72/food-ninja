'use strict';

/**
 * @ngdoc function
 * @name foodNinjaApp.controller:DataparserCtrl
 * @description
 * # DataparserCtrl
 * Controller of the foodNinjaApp
 */
angular.module('foodNinjaApp')
  .controller('DataparserCtrl', function ($scope, Dummyreciept) {
  	//leave awesomethings here! :)
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    var data = Dummyreciept.data;

    var parser = function(data) {
    	//make unicorns here
    	//console.log('my debugs');
    	return {
    		lines: [ 
	    		{
	    			productName: 'Einhornmilch',
	    			productPrice: '9999999999999.99'
	    		},
	    		{
	    			productName: 'Einhornmilch',
	    			productPrice: '9999999999999.99'
	    		}
	    	]
    	};
    };


  });
