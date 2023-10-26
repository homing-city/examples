import { IKey } from '../typings/index';
import { Observer } from './observer';
/**
 * 可观察的
 * @description 将对象转换为可观察对象
 */
export declare const observable: <T extends object>(target: T, key?: IKey, parent?: Observer) => T;
