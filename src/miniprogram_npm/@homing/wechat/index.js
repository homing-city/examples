'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var homing = require('homing');
var index = require('./constants/index.js');
var data = require('./core/data.js');
var data$1 = require('./utils/data.js');
var index$1 = require('./utils/index.js');

/**
 * 观察页面参数
 * @description 将页面参数转为响应式
 */
const observerPageParams = params => {
  if (params[index.OBSERVER_KEY]) return params;
  params[index.OBSERVER_KEY] = homing.createProperty(() => true);
  const onLoad = params.onLoad;
  const reactionCleanups = [];
  const paramsData = params.data || {};
  params.data = {};
  params.onLoad = function (...args) {
    const initData = {};
    const initDataProxy = new Proxy(initData, {
      get: (_v, key) => {
        const prop = Object.getOwnPropertyDescriptor(paramsData, key);
        return prop?.get ? prop.get?.call(this) : prop?.value;
      },
      set: (v, key, newValue) => {
        v[key] = newValue;
        return true;
      }
    });
    Object.defineProperty(this, 'data', {
      get: () => initDataProxy,
      configurable: true
    });
    for (const key in paramsData) {
      initData[key] = this.data[key];
    }
    const innerData = index$1.deepClone(initData);
    const observableData = homing.observable({});
    reactionCleanups.push(homing.watch(observableData, changeObserver => {
      data.updateData(this, changeObserver);
    }));
    let _isInnerChange = false;
    Object.defineProperty(this, 'data', {
      get: () => _isInnerChange ? innerData : observableData
    });
    const setData = this.setData;
    this.setData = (data, callback, innerChange) => {
      if (innerChange) {
        homing.Observer.end();
        const change = index$1.deepClone(data);
        _isInnerChange = true;
        setData.call(this, change, callback);
        _isInnerChange = false;
      } else {
        for (const key in data) {
          data$1.setValue(this.data, data$1.splitPath(key), data[key]);
        }
        if (!this.realCallback) this.realCallback = [];
        this.realCallback.push(callback);
        homing.Observer.end();
      }
    };
    this.setData(innerData);
    const handles = [];
    for (const key in paramsData) {
      const prop = Object.getOwnPropertyDescriptor(paramsData, key);
      const fn = prop?.get ? () => prop.get?.call(this) : () => this.data[key];
      handles.push(() => {
        const state = fn();
        homing.Observer.end();
        if (state) {
          this.data[key] = state;
        }
      });
    }
    reactionCleanups.push(...handles.map(handle => {
      return homing.autorun(handle);
    }));
    return onLoad?.call(this, ...args);
  };
  const onUnload = params.onUnload;
  params.onUnload = function (...args) {
    reactionCleanups.forEach(fn => {
      if (fn) fn();
    });
    return onUnload?.call(this, ...args);
  };
  return params;
};
/**
 * 观察组件参数
 * @description 将组件参数转为响应式
 */
const observerComponentParams = params => {
  if (params[index.OBSERVER_KEY]) return params;
  params[index.OBSERVER_KEY] = homing.createProperty(() => true);
  if (!params.lifetimes) params.lifetimes = {};
  const ready = params.lifetimes.ready;
  const reactionCleanups = [];
  const paramsData = params.data || {};
  params.data = {};
  params.lifetimes.ready = function (...args) {
    const _properties = homing.observable({
      ...this.properties
    });
    const _propertiesMap = {};
    for (const key in _properties) {
      _propertiesMap[key] = {
        get() {
          return _properties[key];
        },
        set(v) {
          _properties[key] = v;
        }
      };
    }
    Object.defineProperties(this.properties, _propertiesMap);
    this.properties = _properties;
    const initData = {};
    const initDataProxy = new Proxy(initData, {
      get: (_v, key) => {
        const prop = Object.getOwnPropertyDescriptor(paramsData, key);
        return prop?.get ? prop.get?.call(this) : prop?.value;
      },
      set: (v, key, newValue) => {
        v[key] = newValue;
        return true;
      }
    });
    Object.defineProperty(this, 'data', {
      get: () => initDataProxy,
      configurable: true
    });
    for (const key in paramsData) {
      initData[key] = this.data[key];
    }
    const innerData = index$1.deepClone(initData);
    const observableData = homing.observable({});
    reactionCleanups.push(homing.watch(observableData, changeObserver => {
      data.updateData(this, changeObserver);
    }));
    let _isInnerChange = false;
    Object.defineProperty(this, 'data', {
      get: () => _isInnerChange ? innerData : observableData
    });
    const setData = this.setData;
    this.setData = (data, callback, innerChange) => {
      if (innerChange) {
        homing.Observer.end();
        const change = index$1.deepClone(data);
        _isInnerChange = true;
        setData.call(this, change, callback);
        _isInnerChange = false;
      } else {
        for (const key in data) {
          data$1.setValue(this.data, data$1.splitPath(key), data[key]);
        }
        if (!this.realCallback) this.realCallback = [];
        this.realCallback.push(callback);
        homing.Observer.end();
      }
    };
    this.setData(innerData);
    const handles = [];
    for (const key in paramsData) {
      const prop = Object.getOwnPropertyDescriptor(paramsData, key);
      const fn = prop?.get ? () => prop.get?.call(this) : () => this.data[key];
      handles.push(() => {
        const state = fn();
        homing.Observer.end();
        if (state) {
          this.data[key] = state;
        }
      });
    }
    reactionCleanups.push(...handles.map(handle => {
      return homing.autorun(handle);
    }));
    ready?.call(this, ...args);
  };
  const detached = params.lifetimes.detached;
  params.lifetimes.detached = function (...args) {
    reactionCleanups.forEach(fn => {
      if (fn) fn();
    });
    return detached?.call(this, ...args);
  };
  return params;
};
/**
 * 观察页面
 * @description 将页面转为响应式
 */
const observerPage = target => {
  if (target[index.OBSERVER_KEY]) return target;
  const page = function (params) {
    return target(observerPageParams(params));
  };
  return Object.defineProperty(page, index.OBSERVER_KEY, {
    configurable: true,
    enumerable: false,
    value: true
  });
};
/**
 * 观察组件
 * @description 将组件转为响应式
 */
const observerComponent = target => {
  if (target[index.OBSERVER_KEY]) return target;
  const component = function (params) {
    return target(observerPageParams(params));
  };
  return Object.defineProperty(component, index.OBSERVER_KEY, {
    configurable: true,
    enumerable: false,
    value: true
  });
};
const globalReference = globalThis;
/**
 * 响应式页面
 */
const ReactivePage = observerPage(globalReference.Page);
/**
 * 响应式组件
 */
const ReactiveComponent = observerComponent(globalReference.Component);
/**
 * 自动观察
 * @description 自动观察 `Page` 以及 `Component`
 */
const autoObserver = () => {
  Object.assign(globalThis, {
    Page: observerPage(Page),
    Component: observerComponent(Component)
  });
};

exports.ReactiveComponent = ReactiveComponent;
exports.ReactivePage = ReactivePage;
exports.autoObserver = autoObserver;
exports.observerComponent = observerComponent;
exports.observerComponentParams = observerComponentParams;
exports.observerPage = observerPage;
exports.observerPageParams = observerPageParams;
