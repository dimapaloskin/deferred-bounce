module.exports = function (resolve, reject, scope, delay) {

  if (!delay) {
    delay = scope;
    scope = this;
  }

  let isRejected = false;
  let timeout = setTimeout(() => {

    isRejected = true;
    reject.apply(scope, arguments);
  }, delay);

  return function() {

    if (isRejected) return;

    clearTimeout(timeout);
    resolve.apply(scope, arguments);
  };
}
