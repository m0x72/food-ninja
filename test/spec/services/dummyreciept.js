'use strict';

describe('Service: Dummyreciept', function () {

  // load the service's module
  beforeEach(module('foodNinjaApp'));

  // instantiate service
  var Dummyreciept;
  beforeEach(inject(function (_Dummyreciept_) {
    Dummyreciept = _Dummyreciept_;
  }));

  it('should do something', function () {
    expect(!!Dummyreciept).toBe(true);
  });

});
