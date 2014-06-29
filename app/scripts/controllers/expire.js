'use strict';

/**
 * @ngdoc function
 * @name foodNinjaApp.controller:ExpireCtrl
 * @description
 * # ExpireCtrl
 * Controller of the foodNinjaApp
 */
angular.module('foodNinjaApp')
  .controller('ExpireCtrl', function ($scope, Reciepts) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    var expirationProducts = [];

    var allReciepts = Reciepts.getReciepts();
    for (var recieptId in allReciepts) {
    	if (allReciepts.hasOwnProperty(recieptId)) {
    		
    		var products = allReciepts[recieptId].products;
    		for (var productId in products) {
    			if (products.hasOwnProperty(productId)) {
    				//logic
    				var product = products[productId];
    				if (!product) {
    					continue;
    				}
    				if (!!product.expiration) {
    					var prod = angular.copy(product);
    					prod.recieptId = recieptId;
    					expirationProducts.push(prod);
    				}
    			}
    		}
    	}
    }

    $scope.expirationProducts = expirationProducts;

    $scope.updateReciept = function(recieptId, product) {
    	// var prod = product;
    	// delete(prod.recieptId);
    	// var rec = Reciepts.getReciept(recieptId);
    	// rec[]
    	// Reciepts.updateReciept(recieptId, product)

    }

  });
