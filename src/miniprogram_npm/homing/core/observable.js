'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var index = require('../constants/index.js');
var index$1 = require('../utils/index.js');
var data = require('./data.js');
var observer = require('./observer.js');

/**
 * 可观察的
 * @description 将对象转换为可观察对象
 */
const observable = (target, key, parent) => {
  if (typeof target !== 'object' || target === null) {
    return target;
  }
  if (key && Object.getOwnPropertyDescriptor(Object.getPrototypeOf(target), key)?.get) {
    return target;
  }
  target = Object.getOwnPropertyDescriptor(target, index.__target__)?.get?.() ?? target;
  const observer$1 = Object.getOwnPropertyDescriptor(target, index.__observer__)?.get?.() ?? new observer.Observer(target);
  if (key !== undefined && parent) {
    observer$1.addParent(key, parent);
  }
  if (observer$1?.proxy) {
    return observer$1?.proxy;
  }
  const proxy = (() => {
    if (Array.isArray(target)) {
      return data.arrayObservable(target, observer$1);
    } else {
      return data.objectObservable(target, observer$1);
    }
  })();
  observer$1.setProxy(proxy);
  Object.defineProperties(target, {
    [index.__target__]: index$1.createProperty(() => target),
    [index.__observer__]: index$1.createProperty(() => observer$1)
  });
  return proxy;
};

exports.observable = observable;
