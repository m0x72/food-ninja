'use strict';

describe('Service: Reciepts', function () {

  // load the service's module
  beforeEach(module('foodNinjaApp'));

  // instantiate service
  var Reciepts;
  beforeEach(inject(function (_Reciepts_) {
    Reciepts = _Reciepts_;
  }));

  it('should do something', function () {
    expect(!!Reciepts).toBe(true);
  });

});
