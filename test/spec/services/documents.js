'use strict';

describe('Service: Documents', function () {

  // load the service's module
  beforeEach(module('foodNinjaApp'));

  // instantiate service
  var Documents;
  beforeEach(inject(function (_Documents_) {
    Documents = _Documents_;
  }));

  it('should do something', function () {
    expect(!!Documents).toBe(true);
  });

});
