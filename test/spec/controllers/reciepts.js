'use strict';

describe('Controller: RecieptsCtrl', function () {

  // load the controller's module
  beforeEach(module('foodNinjaApp'));

  var RecieptsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RecieptsCtrl = $controller('RecieptsCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});