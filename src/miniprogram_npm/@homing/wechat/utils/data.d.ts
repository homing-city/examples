import { IKey } from 'homing';
export declare const getValue: (root: any, path: IKey[]) => any;
export declare const setValue: (root: any, path: IKey[], value: any) => void;
export declare const joinPath: (...path: IKey[]) => string;
export declare const splitPath: (path: string) => string[];
