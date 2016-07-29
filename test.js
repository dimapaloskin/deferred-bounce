'use strict';

var chai = require('chai');
var sinon = require('sinon');
var db = require('./index');

var assert = chai.assert;
var expect = chai.expect;
var spy = sinon.spy;

describe('test deferredBounce resolve, reject', function () {

  it('should call resolve function', function (done) {

    var resolve = function resolve() {};
    var reject = function reject() {};
    var s = spy(resolve);
    var deferred = db(s, reject, 1000);
    deferred();
    assert.equal(s.called, true);
    done();
  });

  it('should call reject function', function (done) {

    var resolve = function resolve() {};
    var reject = function reject() {
      assert.equal(s.called, true);
      done();
    };
    var s = spy(reject);
    var deferred = db(resolve, s, 500);
  });

  it('should pass arguments to resolve function', function (done) {

    var resolve = function resolve(first, second) {
      assert.equal(s.called, true);
      assert.equal(first, 'first');
      assert.equal(second, 'second');
      done();
    };
    var reject = function reject() {};
    var s = spy(resolve);
    var deferred = db(s, reject, 1000);
    deferred('first', 'second');
  });

  it('should bind scope', function (done) {

    var resolve = function resolve() {
      assert.deepEqual(this, {
        message: 'hello'
      });
      done();
    };

    var reject = function reject() {};
    var deferred = db(resolve, reject, { message: 'hello' }, 1000);
    deferred();
  });
});