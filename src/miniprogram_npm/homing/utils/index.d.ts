import { Observer } from '../core/observer';
export declare const createProperty: (fn: () => any) => {
    get: () => any;
    configurable: boolean;
    enumerable: boolean;
};
export declare const getObserver: (target: any) => Observer | undefined;
export declare const getObserverProxy: <T>(target: T) => T | undefined;
export declare const getObserverTarget: <T>(target: T) => T | undefined;
