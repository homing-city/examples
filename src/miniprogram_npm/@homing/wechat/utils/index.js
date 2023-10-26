'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/**
 * 深拷贝
 */
const deepClone = (target, hash = new WeakMap()) => {
  if (target == null || typeof target !== 'object') return target;
  // 处理日期和正则
  if (target instanceof Date) return new Date(target);
  if (target instanceof RegExp) return new RegExp(target);
  // 如果对象已经被拷贝过，直接从hash中取值返回
  if (hash.has(target)) return hash.get(target);
  // 创建新对象，并存入hash
  const value = Array.isArray(target) ? [] : {};
  hash.set(target, value);
  // 递归拷贝
  for (const key in target) {
    if (target.hasOwnProperty(key)) {
      value[key] = deepClone(target[key], hash);
    }
  }
  return value;
};

exports.deepClone = deepClone;
