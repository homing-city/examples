import { IChangeItem, IHandle, IKey } from '../typings/index';
export declare class Observer {
    readonly id: number;
    target: any;
    proxy: any;
    constructor(target: any);
    setProxy(proxy: any): void;
    static handler: IHandle | null;
    static start(handler: IHandle): void;
    static end(): (() => void) | undefined;
    private static _flushHandles?;
    static flushStart(): void;
    static flushEnd(): void;
    private handles;
    collect(key: IKey): void;
    static autorun(handle: IHandle): (() => void) | undefined;
    run(key?: IKey): void;
    parents: Observer[];
    parentKeys: IKey[];
    changes: IChangeItem[];
    static changeObservers: Set<Observer>;
    addParent(key: IKey, parent: Observer): boolean;
    protected _changeHandles: ((item: Observer) => void)[];
    onChange(handle: (item: Observer) => void): () => void;
    emitChange(item: Observer): void;
    pushChange(item: IChangeItem): void;
    removeParent(parent: Observer): void;
    static clearChange(): void;
}
