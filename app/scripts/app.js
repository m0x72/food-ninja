'use strict';

/**
 * @ngdoc overview
 * @name foodNinjaApp
 * @description
 * # foodNinjaApp
 *
 * Main module of the application.
 */
angular
  .module('foodNinjaApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'angularOAuth'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/auth', {
        templateUrl: 'views/auth.html',
        controller: 'AuthCtrl'
      })
      .when('/authCallback', {
        templateUrl: 'views/authcallback.html',
        controller: 'AuthcallbackCtrl'
      })
      .when('/document', {
        templateUrl: 'views/document.html',
        controller: 'DocumentCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  
  .config(function(OAuthProvider) {
    OAuthProvider.extendConfig({
      clientId: 'team6',
      redirectUri: 'http://localhost:9000/#/authCallback?',
      authorizationEndpoint: 'https://user.gini.net/oauth/authorize',
      verifyFunc: 'test'
    });
  })
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('oauthHttpInterceptor');
  })
  ;