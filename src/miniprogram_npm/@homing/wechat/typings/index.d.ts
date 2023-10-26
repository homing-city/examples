import { OBSERVER_KEY } from '../constants';
export type IData = Record<string | symbol, any>;
export type ObservableTarget<T> = T & {
    [OBSERVER_KEY]?: boolean;
};
