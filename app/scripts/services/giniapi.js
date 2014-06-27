'use strict';

/**
 * @ngdoc service
 * @name foodNinjaApp.giniApi
 * @description
 * # giniApi
 * Service in the foodNinjaApp.
 */
angular.module('foodNinjaApp')
  .service('Giniapi', function Giniapi($resource, $http) {
  	var giniApiSuffix = 'https://api.gini.net';
   //  this.document = $resource(
   //  	giniApiSuffix + '/documents/:id', 
   //  	{id: '@id'},
   //  	{
   //  		save: {
   //  			method: 'POST',
   //  			headers: {
   //  				'Authorization': 'Bearer',
   //  				'Accept': 'application/vnd.gini.v1+json',
   //  				'Content-Type': 'multipart/form-data'
   //  			}
   //  		}
  	// 	}
  	// );
    this.documentUpload = function(formdata) {
    	return $http({
    		url: giniApiSuffix + '/documents?filename=file.pdf&doctype=Receipt', 
    		method: 'POST', 
    		data: formdata,
    		transformRequest: angular.identity,
    		headers: {
    			'Authorization': 'Bearer',
  				'Accept': 'application/vnd.gini.v1+json',
  				'Content-Type': undefined //'multipart/form-data'
  			}
  		});
    };
    this.document = function(id) {
    	return $http({
    		url: giniApiSuffix + '/documents/' + id, 
    		method: 'GET', 
    		// data: formdata,
    		//transformRequest: angular.identity,
    		headers: {
    			'Authorization': 'Bearer',
  				'Accept': 'application/vnd.gini.incubator+json',
  				//'Content-Type': undefined //'multipart/form-data'
  			}
  		});
    };
    this.documentLayout = function(id) {
    	return $http({
    		url: giniApiSuffix + '/documents/' + id + '/layout', 
    		method: 'GET', 
    		//data: formdata,
    		//transformRequest: angular.identity,
    		headers: {
    			'Authorization': 'Bearer',
  				'Accept': 'application/vnd.gini.incubator+json',
  				//'Content-Type': undefined //'multipart/form-data'
  			}
  		});
    };
    this.documentProcessed = function(id) {
    	return $http({
    		url: giniApiSuffix + '/documents/' + id + '/processed', 
    		method: 'GET', 
    		//data: formdata,
    		//transformRequest: angular.identity,
    		headers: {
    			'Authorization': 'Bearer',
  				'Accept': 'application/vnd.gini.incubator+json',
  				//'Content-Type': undefined //'multipart/form-data'
  			}
  		});
    };
    this.documentExtractions = function(id) {
    	return $http({
    		url: giniApiSuffix + '/documents/' + id + '/extractions', 
    		method: 'GET', 
    		//data: formdata,
    		//transformRequest: angular.identity,
    		headers: {
    			'Authorization': 'Bearer',
  				'Accept': 'application/vnd.gini.incubator+json',
  				//'Content-Type': undefined //'multipart/form-data'
  			}
  		});
    };
  });
