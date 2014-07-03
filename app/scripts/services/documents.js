'use strict';

/**
 * @ngdoc service
 * @name foodNinjaApp.Documents
 * @description
 * # Documents
 * Service in the foodNinjaApp.
 */
angular.module('foodNinjaApp')
  .factory('Documents', function Documents(Giniapi, $q, $timeout) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    //this.getDocuments = Giniapi.resDocument.query();

    var documents = null;

    return {
    	getDocuments: function() {
    		return Giniapi.resDocument().query();
    	},
    	getMoreDocuments: function() {
    		//queryparams
    	},
    	uploadDocument: function(formData) {
    		//
    		return Giniapi.resDocument().save({}, formData);
    	},
    	getDocument: function(id) {
    		// either documents or get()
    		return Giniapi.resDocument().get({documentId: id});
    	},
        // deleteDocument: function(id) {
        //     // either documents or get()
        //     return Giniapi.resDocument().delete({documentId: id}).$promise;
        // },
    	getDocumentLayout: function(id) {
    		//
    		return Giniapi.resDocument().layout({documentId: id});
    	},
    	getDocumentExtractions: function(id) {
    		//
    		return Giniapi.resDocument().extractions({documentId: id});
    	},
        getProcessedEvent: function(id) {
            var deferred = $q.defer();
            var tries = 20;
            function handler() {
                $timeout(function(){
                    tries--;
                    Giniapi.resDocument().get({documentId: id}).$promise.then(function(data) {
                        if(data.progress === 'COMPLETED') {
                            deferred.resolve(data);
                        } else if (data.progress === 'ERROR') {
                            deferred.reject(data);
                        } else if (tries === 0) {
                            deferred.reject("Too many trials. Try again later.");
                        } else {
                            deferred.notify('Trying ' + tries + ' more times.');
                            handler();
                        }
                    });
                }, 1500);
            }
            handler();
            return deferred.promise;
        }
    };

  });
