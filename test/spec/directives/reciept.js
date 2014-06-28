'use strict';

describe('Directive: reciept', function () {

  // load the directive's module
  beforeEach(module('foodNinjaApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<reciept></reciept>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the reciept directive');
  }));
});
