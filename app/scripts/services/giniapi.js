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

  	
  	this.resDocument = $resource(
  		giniApiSuffix + '/documents/:documentId',
  		{documentId: '@id'},
  		{
  			save: {
  				method: 'POST', 
					params: {filename: 'file.pdf', doctype: 'Reciept'},
					transformRequest: angular.identity,
					transformResponse: function(data, headersGetter) {
						return {
							id: headersGetter('location').replace(/^https:\/\/api.gini.net\/documents\//, '')
						};
					},
  				headers: {
  					'Authorization': 'Bearer',
  					'Accept': 'application/vnd.gini.v1+json',
  					'Content-Type': undefined
  				}
  			},
  			query: {
  				method: 'GET',
  				params: {limit: 50, offset: 0},
  				isArray: true,
  				transformResponse: function(data, headersGetter) {
  					return angular.fromJson(data).documents;
  				},
  				headers: {
	    			'Authorization': 'Bearer',
  					'Accept': 'application/vnd.gini.v1+json',
  				}
  			},
  			get: {
  				method: 'GET',
  				headers: {
  					'Authorization': 'Bearer',
  					'Accept': 'application/vnd.gini.v1+json',	
  				}
  			}, 
  			delete: {
  				method: 'DELETE',
  				headers: {
  					'Authorization': 'Bearer',
  					'Accept': 'application/vnd.gini.v1+json',	
  				}
  			},
  			layout: {
  				url: giniApiSuffix + '/documents/:documentId/layout',
  				params: {documentId: '@id'},
  				method: 'GET',
  				headers: {
	    			'Authorization': 'Bearer',
  					'Accept': 'application/vnd.gini.v1+json',
  				}
  			},
  			extractions: {
  				url: giniApiSuffix + '/documents/:documentId/extractions',
  				method: 'GET',
  				headers: {
	    			'Authorization': 'Bearer',
  					'Accept': 'application/vnd.gini.incubator+json',
  				}
  			}
  		}
  	);

		this.eventSubscription = function() {
			return new EventSource('https://notifications.gini.net/events/client');
			// return $http({
			// 	url: 'https://notifications.gini.net/events/client',
			// 	method: 'GET',
			// 	headers: {
			// 		'Accept': 'text/event-stream',
			// 		'Authorization': 'Bearer'
			// 	}
			// });
		};

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
  				'Accept': 'application/vnd.gini.v1+json',
  				//'Content-Type': undefined //'multipart/form-data'
  			}
  		});
    };
    this.documentList = function() {
    	return $http({
    		url: giniApiSuffix + '/documents',
    		method: 'GET',
    		headers: {
    			'Authorization': 'Bearer',
    			'Accept': 'application/vnc.gini.v1+json'
    		}
    	})
    };
    this.documentLayout = function(id) {
    	return $http({
    		url: giniApiSuffix + '/documents/' + id + '/layout', 
    		method: 'GET', 
    		//data: formdata,
    		//transformRequest: angular.identity,
    		headers: {
    			'Authorization': 'Bearer',
  				'Accept': 'application/vnd.gini.v1+json',
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
  				'Accept': 'application/pdf',	//application/pdf
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
