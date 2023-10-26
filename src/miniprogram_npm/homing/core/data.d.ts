import { Observer } from './observer';
export declare const objectObservable: <T extends object>(target: T, observer: Observer) => T;
export declare const arrayObservable: <T extends any[]>(target: T, observer: Observer) => T;
