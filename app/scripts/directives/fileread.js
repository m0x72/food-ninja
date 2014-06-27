'use strict';

/**
 * @ngdoc directive
 * @name foodNinjaApp.directive:fileread
 * @description
 * # fileread
 */
angular.module('foodNinjaApp')
  .directive('fileread', function () {
    return {
      restrict: 'A',
      scope: {
        fileread: '='
      },
      link: function postLink(scope, element) {
        element.on('change', function () {
        	// var reader = new FileReader();
         //  reader.onload = function (loadEvent) {
         //    scope.$apply(function () {
         //      scope.fileread = loadEvent.target.result;
         //      console.log('filread', scope.fileread, 'loadEvent', loadEvent);
         //    });
         //  };
         //  reader.readAsDataURL(changeEvent.target.files[0]);
         //  console.log('changeEvent', changeEvent, 'reader', reader, 'File', changeEvent.target.files[0]);
        	scope.$apply(function(){
        		//scope.fileread = changeEvent.target.files[0];
        		scope.fileread = element[0].files[0];
        		console.log('filread', scope.fileread, 'elem', element[0].files[0]);
        	});
        });
      }
    };
  });