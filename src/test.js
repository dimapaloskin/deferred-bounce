'use strict';

const chai = require('chai');
const sinon = require('sinon');
const db = require('./index');

const assert = chai.assert;
const expect = chai.expect;
const spy = sinon.spy;

describe('test deferredBounce resolve, reject', () => {

  it('should call resolve function', (done) => {

    const resolve = () => {};
    const reject = () => {};
    const s = spy(resolve);
    const deferred = db(s, reject, 1000);
    deferred();
    assert.equal(s.called, true);
    done();

  });

  it('should call reject function', (done) => {

    const resolve = () => {};
    const reject = () => {
      assert.equal(s.called, true);
      done();
    };
    const s = spy(reject);
    const deferred = db(resolve, s, 500);

  });

  it('should pass arguments to resolve function', (done) => {

    const resolve = (first, second) => {
      assert.equal(s.called, true);
      assert.equal(first, 'first');
      assert.equal(second, 'second');
      done();
    };
    const reject = () => {};
    const s = spy(resolve);
    const deferred = db(s, reject, 1000);
    deferred('first', 'second');

  });

  it('should bind scope', (done) => {

    var resolve = function() {
      assert.deepEqual(this, {
        message: 'hello'
      });
      done();
    };

    const reject = () => {};
    const deferred = db(resolve, reject, {message: 'hello'}, 1000);
    deferred();
  });

});
