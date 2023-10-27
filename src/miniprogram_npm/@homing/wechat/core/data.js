'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var homing = require('homing');
var data = require('../utils/data.js');

const getChangePathList = (rootObserver, current, pathList = [], path = []) => {
  if (rootObserver === current) {
    pathList.push(path);
  } else if (current.parents.length) {
    current.parents.forEach((parent, index) => {
      getChangePathList(rootObserver, parent, pathList, [current.parentKeys[index], ...path]);
    });
  }
  return pathList;
};
class ChangeMerge {
  list = [];
  push(path, start, end) {
    this.list.push({
      key: path.join('.') + '.' + (start ? `[N].` : ''),
      path,
      start,
      end
    });
  }
  exec(target) {
    if (this.list.length) {
      this.list.sort((v1, v2) => {
        return v1.key > v2.key ? 1 : -1;
      });
      let current = this.list[0].key + '.';
      const change = {};
      this.list.forEach((item, _index) => {
        if (item.key.startsWith(current)) {
          return;
        }
        current = item.key;
        if (item.start && item.end) {
          const arr = data.getValue(target, item.path);
          const path = data.joinPath(...item.path);
          for (let i = item.start; i < item.end; i++) {
            change[path + `[${i}]`] = arr[i];
          }
        } else {
          change[data.joinPath(...item.path)] = data.getValue(target, item.path);
        }
      });
      return change;
    }
  }
}
const getMpInstanceChangeTrace = (instance, observers) => {
  const changeTrace = [];
  const rootObserver = homing.getObserver(instance.data);
  if (rootObserver) {
    observers.forEach(observer => {
      const pathList = getChangePathList(rootObserver, observer);
      pathList.forEach(path => {
        observer.changes.forEach(change => {
          changeTrace.push({
            path: path,
            ...change
          });
        });
      });
    });
  }
  return changeTrace;
};
const getMpInstanceChange = (instance, changeTrace) => {
  const changeMerge = new ChangeMerge();
  if (changeTrace.length) {
    changeTrace.forEach(_change => {
      switch (_change.type) {
        case homing.ChangeType.Set:
          changeMerge.push([..._change.path, _change.key]);
          break;
        case homing.ChangeType.ArrayPush:
          if (_change.start === 0) {
            changeMerge.push(_change.path);
          } else {
            changeMerge.push([..._change.path], _change.start, _change.start + _change.items.length);
          }
          break;
        case homing.ChangeType.ArrayPop:
          changeMerge.push([..._change.path, 'length']);
          break;
        case homing.ChangeType.ArraySplice:
        case homing.ChangeType.ArrayShift:
        case homing.ChangeType.ArrayUnshift:
        case homing.ChangeType.ArraySort:
        case homing.ChangeType.ArrayReverse:
          changeMerge.push(_change.path);
          break;
      }
    });
    return changeMerge.exec(instance.data);
  }
};
const changedInstance = new Set();
const updateData = (instance, observer) => {
  if (!instance.__changedObservers) {
    instance.__changedObservers = new Set();
  }
  if (!changedInstance.size) {
    setTimeout(() => {
      // console.time('updateData');
      changedInstance.forEach(_instance => {
        if (_instance.__changedObservers) {
          const changeTrace = getMpInstanceChangeTrace(_instance, _instance.__changedObservers);
          const change = getMpInstanceChange(_instance, changeTrace);
          if (change) {
            // console.log('[change]', _instance.is, change);
            _instance.setData(change, () => {
              if (_instance.realCallback?.length) {
                _instance.realCallback.forEach(fn => {
                  if (fn) fn();
                });
                _instance.realCallback = null;
              }
            }, true);
          }
          _instance.__changedObservers.clear();
        }
      });
      changedInstance.clear();
      homing.Observer.clearChange();
      // console.timeEnd('updateData');
    }, 16);
  }
  instance.__changedObservers.add(observer);
  changedInstance.add(instance);
};

exports.updateData = updateData;
