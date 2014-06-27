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
    this.document = $resource(
    	giniApiSuffix + '/documents/:id', 
    	{id: '@id'},
    	{
    		save: {
    			method: 'POST',
    			headers: {
    				'Authorization': 'Bearer',
    				'Accept': 'application/vnd.gini.v1+json',
    				'Content-Type': 'multipart/form-data'
    			}
    		}
  		}
  	);
    this.documentUpload = function(formdata) {
    	$http({
    		url: giniApiSuffix + '/documents', 
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
  });
