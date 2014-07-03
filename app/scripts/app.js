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
      .when('/dataparser', {
        templateUrl: 'views/dataparser.html',
        controller: 'DataparserCtrl'
      })
      .when('/dummytemplates', {
        templateUrl: 'views/dummytemplates.html',
        controller: 'DummytemplatesCtrl'
      })
      .when('/document', {
        templateUrl: 'views/documents.html',
        controller: 'DocumentsCtrl'
      })
      .when('/document/:id', {
        templateUrl: 'views/document.html',
        controller: 'DocumentCtrl'
      })
      .when('/upload', {
        templateUrl: 'views/upload.html',
        controller: 'UploadCtrl'
      })
      .when('/reciept/:id', {
        templateUrl: 'views/reciept.html',
        controller: 'RecieptCtrl'
      })
      .when('/reciept', {
        templateUrl: 'views/reciepts.html',
        controller: 'RecieptsCtrl'
      })
      .when('/expire', {
        templateUrl: 'views/expire.html',
        controller: 'ExpireCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .config(function(OAuthProvider) {
    var redirectUri = window.location.protocol + "//" + window.location.host + "/#/authCallback?";
    OAuthProvider.extendConfig({
      clientId: 'team6',
      redirectUri: redirectUri,
      authorizationEndpoint: 'https://user.gini.net/oauth/authorize',
      verifyFunc: 'test'
    });
  })
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('oauthHttpInterceptor');
  });