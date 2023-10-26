import { IHandle } from '../typings/index';
import { Observer } from './observer';
export declare const autorun: typeof Observer.autorun;
/**
 *
 * @param handle
 */
export declare const flushRun: (handle: IHandle) => void;
/**
 * 无延时的执行内容
 * @param handle
 */
export declare const runWithoutDelay: (_handle: IHandle) => void;
export declare const watch: (data: any, onChange: (changeObserver: Observer, rootObserver: Observer) => void) => (() => void) | undefined;
