'use strict';

/**
 * @ngdoc service
 * @name foodNinjaApp.Reciepts
 * @description
 * # Reciepts
 * Service in the foodNinjaApp.
 */
angular.module('foodNinjaApp')
  .service('Reciepts', function Reciepts() {
    // AngularJS will instantiate a singleton by calling "new" on this function
    this.reciepts = [];
    this.addReciepts = function(recieptdata) {
    	//save it!
    	this.reciepts.push(recieptdata);
    };
    this.getReciepts = function(){
    	return this.reciepts;
    }

  });
