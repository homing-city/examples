'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var index = require('../utils/index.js');
var observer = require('./observer.js');

const autorun = observer.Observer.autorun;
/**
 *
 * @param handle
 */
const flushRun = handle => {
  observer.Observer.flushStart();
  handle();
  observer.Observer.flushEnd();
};
/**
 * 无延时的执行内容
 * @param handle
 */
const runWithoutDelay = _handle => {
  //TODO
};
const watch = (data, onChange) => {
  const observer = index.getObserver(data);
  return observer?.onChange(changeObserver => {
    onChange(changeObserver, observer);
  });
};

exports.autorun = autorun;
exports.flushRun = flushRun;
exports.runWithoutDelay = runWithoutDelay;
exports.watch = watch;
