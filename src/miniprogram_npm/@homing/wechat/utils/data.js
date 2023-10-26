'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const getValue = (root, path) => {
  let data = root;
  for (let i = 0; i < path.length; i++) {
    if (typeof data !== 'object' || data == null) {
      return undefined;
    }
    data = data[path[i]];
  }
  return data;
};
const setValue = (root, path, value) => {
  for (let i = 0; i < path.length; i++) {
    if (i !== path.length - 1) {
      root = root[path[i]];
      continue;
    }
    root[path[i]] = value;
  }
};
const joinPath = (...path) => {
  return path.map((key, index) => {
    if (index === 0) return key;
    if (/^(\d|[1-9]\d+)$/.test(String(key))) return `[${String(key)}]`;
    return `.${String(key)}`;
  }).join('');
};
const splitPath = path => {
  return path.split(/[\.\[\]]/).filter(Boolean);
};

exports.getValue = getValue;
exports.joinPath = joinPath;
exports.setValue = setValue;
exports.splitPath = splitPath;
