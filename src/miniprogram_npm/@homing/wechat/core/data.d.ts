import { Observer } from 'homing';
import { IData } from '../typings/index';
interface IMpInstance {
    setData: (data: IData, callback?: (() => void) | null, innerChange?: boolean) => void;
    __changedObservers?: Set<Observer>;
    data: IData;
    is: string;
    realCallback: Array<Function> | null;
}
export declare const updateData: (instance: IMpInstance, observer: Observer) => void;
export {};
