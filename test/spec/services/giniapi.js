'use strict';

describe('Service: Giniapi', function () {

  // load the service's module
  beforeEach(module('foodNinjaApp'));

  // instantiate service
  var Giniapi;
  beforeEach(inject(function (_Giniapi_) {
    Giniapi = _Giniapi_;
  }));

  it('should do something', function () {
    expect(!!Giniapi).toBe(true);
  });

});
