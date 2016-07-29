"use strict";

module.exports = function (resolve, reject, scope, delay) {
  var _arguments = arguments;


  if (!delay) {
    delay = scope;
    scope = this;
  }

  var isRejected = false;
  var timeout = setTimeout(function () {

    isRejected = true;
    reject.apply(scope, _arguments);
  }, delay);

  return function () {

    if (isRejected) return;

    clearTimeout(timeout);
    resolve.apply(scope, arguments);
  };
};