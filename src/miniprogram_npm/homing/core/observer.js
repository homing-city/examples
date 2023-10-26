'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

let ID = 0;
class Observer {
  constructor(target) {
    this.target = target;
    ID++;
    this.id = ID;
  }
  setProxy(proxy) {
    this.proxy = proxy;
  }
  static handler = null;
  static start(handler) {
    if (!handler.disposer) {
      handler.disposer = () => {
        handler.disposes?.forEach(handleSet => {
          handleSet.delete(handler);
        });
        handler.disposes = undefined;
      };
    }
    handler.disposer?.();
    this.handler = handler;
  }
  static end() {
    const handler = this.handler;
    this.handler = null;
    return handler?.disposer;
  }
  static flushStart() {
    if (!this._flushHandles) {
      this._flushHandles = new Set();
    }
  }
  static flushEnd() {
    this._flushHandles?.forEach(cb => cb());
    this._flushHandles = undefined;
  }
  handles = {};
  collect(key) {
    const handler = Observer.handler;
    if (handler) {
      let handles = this.handles[key];
      if (!handles) {
        handles = new Set();
        this.handles[key] = handles;
      }
      handles.add(handler);
      if (!handler.disposes) {
        handler.disposes = [];
      }
      handler.disposes.push(this?.handles[key]);
    }
  }
  static autorun(handle) {
    Observer.start(handle);
    handle();
    return Observer.end();
  }
  run(key) {
    const handleSet = Observer._flushHandles || new Set();
    if (key) {
      const handles = this.handles[key];
      if (handles) {
        handles.forEach(cb => {
          handleSet.add(cb);
        });
      }
    } else {
      for (const key in this.handles) {
        this.handles[key].forEach(cb => {
          handleSet.add(cb);
        });
      }
      this.parents.forEach((parent, index) => {
        parent.handles[this.parentKeys[index]]?.forEach(cb => {
          handleSet.add(cb);
        });
      });
    }
    if (!Observer._flushHandles) {
      handleSet.forEach(cb => {
        Observer.autorun(cb);
      });
    }
  }
  parents = [];
  parentKeys = [];
  changes = [];
  static changeObservers = new Set();
  addParent(key, parent) {
    if (!this.parents.includes(parent)) {
      this.parents.push(parent);
      this.parentKeys.push(key);
      return true;
    }
    return false;
  }
  _changeHandles = [];
  onChange(handle) {
    this._changeHandles.push(handle);
    return () => {
      this._changeHandles = this._changeHandles.filter(v => handle !== v);
    };
  }
  emitChange(item) {
    this._changeHandles.forEach(fn => {
      fn(item);
    });
    this.parents.forEach(parent => {
      parent.emitChange(item);
    });
  }
  pushChange(item) {
    const set = this.changes.find(v => v.key === item.key);
    if (set) {
      set.newValue = item.newValue;
    } else {
      this.changes.push(item);
      Observer.changeObservers.add(this);
    }
    this.emitChange(this);
  }
  removeParent(parent) {
    const index = this.parents.indexOf(parent);
    if (index > -1) {
      this.parents.splice(index, 1);
      this.parentKeys.splice(index, 1);
    }
  }
  static clearChange() {
    this.changeObservers.forEach(observer => {
      observer.changes = [];
    });
    this.changeObservers.clear();
  }
}

exports.Observer = Observer;
