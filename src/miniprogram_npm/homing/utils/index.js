'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var index = require('../constants/index.js');

const createProperty = fn => {
  return {
    get: fn,
    configurable: true,
    enumerable: false
  };
};
const getObserver = target => {
  if (typeof target !== 'object' || target === null) {
    return;
  }
  const desc = Object.getOwnPropertyDescriptor(target, index.__observer__);
  return desc?.get?.();
};
const getObserverProxy = target => {
  const observer = getObserver(target);
  return observer?.proxy;
};
const getObserverTarget = target => {
  if (typeof target !== 'object' || target === null) {
    return;
  }
  const desc = Object.getOwnPropertyDescriptor(target, index.__target__);
  return desc?.get?.();
};

exports.createProperty = createProperty;
exports.getObserver = getObserver;
exports.getObserverProxy = getObserverProxy;
exports.getObserverTarget = getObserverTarget;
