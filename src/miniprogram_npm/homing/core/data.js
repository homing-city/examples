'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var index$1 = require('../constants/index.js');
var index = require('../utils/index.js');
var observable = require('./observable.js');

const objectObservable = (target, observer) => {
  const proxy = new Proxy(target, {
    get(v, key) {
      observer.collect(key);
      return observable.observable(target[key], key, observer);
    },
    set(v, key, newValue) {
      const oldValue = target[key];
      if (oldValue === newValue) {
        return true;
      }
      const oldObserver = index.getObserver(oldValue);
      const newObserver = index.getObserver(newValue);
      if (oldObserver && oldObserver === newObserver) {
        return true;
      }
      if (oldObserver) {
        oldObserver.removeParent(observer);
      }
      if (newObserver) {
        newObserver.addParent(key, observer);
      }
      observer.pushChange({
        key: key,
        type: index$1.ChangeType.Set,
        oldValue: target[key],
        newValue: newValue
      });
      target[key] = newValue;
      observer.run(key);
      return true;
    }
  });
  return proxy;
};
const methodsToProxy = ['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'];
const arrayMethodsProxyFactory = observer => {
  const methodsCache = {};
  return p => {
    if (!methodsCache[p]) {
      methodsCache[p] = new Proxy(observer.target[p], {
        apply(method, thisArg, argArray) {
          switch (p) {
            case 'push':
              {
                observer.pushChange({
                  type: index$1.ChangeType.ArrayPush,
                  items: argArray,
                  start: thisArg.length
                });
                break;
              }
            case 'pop':
              {
                observer.pushChange({
                  type: index$1.ChangeType.ArrayPop,
                  length: observer.target.length
                });
                break;
              }
            case 'shift':
              {
                observer.pushChange({
                  type: index$1.ChangeType.ArrayShift
                });
                break;
              }
            case 'unshift':
              {
                observer.pushChange({
                  type: index$1.ChangeType.ArrayUnshift
                });
                break;
              }
            case 'splice':
              {
                const [start, deleteCount, ...items] = argArray;
                observer.pushChange({
                  type: index$1.ChangeType.ArraySplice,
                  start: start,
                  deleteCount: deleteCount,
                  length: observer.target.length,
                  items: items
                });
                break;
              }
            case 'sort':
              {
                observer.pushChange({
                  type: index$1.ChangeType.ArraySort
                });
                break;
              }
            case 'reverse':
              {
                observer.pushChange({
                  type: index$1.ChangeType.ArrayReverse
                });
                break;
              }
          }
          const res = method.apply(observer.target, argArray);
          observer.run();
          return res;
        }
      });
    }
    return methodsCache[p];
  };
};
const arrayObservable = (target, observer) => {
  const arrayMethodsProxy = arrayMethodsProxyFactory(observer);
  const proxy = new Proxy(target, {
    get(v, p) {
      if (typeof p === 'string' && methodsToProxy.includes(p)) {
        return arrayMethodsProxy(p);
      }
      observer.collect(p);
      return observable.observable(target[p], p, observer);
    },
    set(v, key, newValue) {
      const oldValue = target[key];
      if (oldValue === newValue) {
        return true;
      }
      const oldObserver = index.getObserver(oldValue);
      const newObserver = index.getObserver(newValue);
      if (oldObserver && oldObserver === newObserver) {
        return true;
      }
      if (oldObserver) {
        oldObserver.removeParent(observer);
      }
      if (newObserver) {
        newObserver.addParent(key, observer);
      }
      observer.pushChange({
        key: key,
        type: index$1.ChangeType.Set,
        oldValue: oldValue,
        newValue: newValue
      });
      target[key] = newValue;
      observer.run(key);
      return true;
    }
  });
  return proxy;
};

exports.arrayObservable = arrayObservable;
exports.objectObservable = objectObservable;
