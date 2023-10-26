import { ChangeType } from '../constants/index';
export type IKey = string | number | symbol;
export type IHandle = (() => void) & {
    disposes?: Set<IHandle>[];
    disposer?: () => void;
};
export interface IChangeValueSet {
    type: ChangeType.Set;
    key: IKey;
    oldValue: any;
    newValue: any;
}
export interface IChangeArrayPush {
    type: ChangeType.ArrayPush;
    items: any[];
    start: number;
}
export interface IChangeArrayPop {
    type: ChangeType.ArrayPop;
    length: number;
}
export interface IChangeArrayShift {
    type: ChangeType.ArrayShift;
}
export interface IChangeArrayUnshift {
    type: ChangeType.ArrayUnshift;
}
export interface IChangeArraySplice {
    type: ChangeType.ArraySplice;
    start: number;
    length: number;
    deleteCount?: number;
    items?: any[];
}
export interface IChangeArraySort {
    type: ChangeType.ArraySort;
}
export interface IChangeArrayReverse {
    type: ChangeType.ArrayReverse;
}
export type IChangeItem = IChangeValueSet | IChangeArrayPop | IChangeArrayPush | IChangeArrayShift | IChangeArrayUnshift | IChangeArraySplice | IChangeArraySort | IChangeArrayReverse;
