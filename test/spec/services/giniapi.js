'use strict';

describe('Service: giniApi', function () {

  // load the service's module
  beforeEach(module('foodNinjaApp'));

  // instantiate service
  var giniApi;
  beforeEach(inject(function (_giniApi_) {
    giniApi = _giniApi_;
  }));

  it('should do something', function () {
    expect(!!giniApi).toBe(true);
  });

});
