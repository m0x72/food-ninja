'use strict';

angular.module('angularOAuth')
	.factory('oauthHttpInterceptor', [ 'OAuth', function(OAuth) {
  return {
    request: function(config) {
      // TODO: This is just example logic, you could check the URL (for example)
      if (config.headers.Authorization === 'Bearer') {
        config.headers.Authorization = 'Bearer ' + btoa(OAuth.getToken());
      }
      return config;
    }
  };
}]);