'use strict';

describe('Controller: DataparserCtrl', function () {

  // load the controller's module
  beforeEach(module('foodNinjaApp'));

  var DataparserCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DataparserCtrl = $controller('DataparserCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
