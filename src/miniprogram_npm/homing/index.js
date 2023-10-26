'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var index = require('./constants/index.js');
var index$1 = require('./utils/index.js');
var data = require('./core/data.js');
var func = require('./core/func.js');
var observable = require('./core/observable.js');
var observer = require('./core/observer.js');



Object.defineProperty(exports, 'ChangeType', {
	enumerable: true,
	get: function () { return index.ChangeType; }
});
exports.__observer__ = index.__observer__;
exports.__target__ = index.__target__;
exports.createProperty = index$1.createProperty;
exports.getObserver = index$1.getObserver;
exports.getObserverProxy = index$1.getObserverProxy;
exports.getObserverTarget = index$1.getObserverTarget;
exports.arrayObservable = data.arrayObservable;
exports.objectObservable = data.objectObservable;
exports.autorun = func.autorun;
exports.flushRun = func.flushRun;
exports.runWithoutDelay = func.runWithoutDelay;
exports.watch = func.watch;
exports.observable = observable.observable;
exports.Observer = observer.Observer;
