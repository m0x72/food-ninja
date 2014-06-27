'use strict';

/**
 * @ngdoc service
 * @name foodNinjaApp.giniApi
 * @description
 * # giniApi
 * Service in the foodNinjaApp.
 */
angular.module('foodNinjaApp')
  .service('Giniapi', function Giniapi($resource) {
    this.document = $resource(
    	'/documents/:id', 
    	{id: '@id'},
    	{
    		save: {
    			method: 'POST',
    			headers: {'Authorization': 'Bearer'}
    		}
    	});
  });
