'use strict';

describe('Controller: RecieptCtrl', function () {

  // load the controller's module
  beforeEach(module('foodNinjaApp'));

  var RecieptCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RecieptCtrl = $controller('RecieptCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
