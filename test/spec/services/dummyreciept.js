'use strict';

describe('Service: dummyReciept', function () {

  // load the service's module
  beforeEach(module('foodNinjaApp'));

  // instantiate service
  var dummyReciept;
  beforeEach(inject(function (_dummyReciept_) {
    dummyReciept = _dummyReciept_;
  }));

  it('should do something', function () {
    expect(!!dummyReciept).toBe(true);
  });

});
