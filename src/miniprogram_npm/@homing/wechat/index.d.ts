/// <reference types="miniprogram-api-typings" />
/// <reference types="miniprogram-api-typings" />
/// <reference types="miniprogram-api-typings" />
/// <reference types="miniprogram-api-typings" />
/// <reference types="miniprogram-api-typings" />
/// <reference types="miniprogram-api-typings" />
/// <reference types="miniprogram-api-typings" />
/// <reference types="miniprogram-api-typings" />
import { OBSERVER_KEY } from './constants/index';
import { ObservableTarget } from './typings/index';
/**
 * 观察页面参数
 * @description 将页面参数转为响应式
 */
export declare const observerPageParams: (params: Parameters<WechatMiniprogram.Page.Constructor>[0] & {
    [OBSERVER_KEY]?: any;
}) => WechatMiniprogram.Page.CustomOption & Partial<WechatMiniprogram.Page.Data<WechatMiniprogram.Page.DataOption>> & Partial<WechatMiniprogram.Page.ILifetime> & {
    options?: WechatMiniprogram.Component.ComponentOptions | undefined;
} & ThisType<WechatMiniprogram.Page.Instance<WechatMiniprogram.Page.DataOption, WechatMiniprogram.Page.CustomOption>> & {
    [OBSERVER_KEY]?: any;
};
/**
 * 观察组件参数
 * @description 将组件参数转为响应式
 */
export declare const observerComponentParams: (params: Parameters<WechatMiniprogram.Component.Constructor>[0] & {
    [OBSERVER_KEY]?: any;
}) => Partial<WechatMiniprogram.Component.Data<WechatMiniprogram.Component.DataOption>> & Partial<WechatMiniprogram.Component.Property<WechatMiniprogram.Component.PropertyOption>> & Partial<WechatMiniprogram.Component.Method<WechatMiniprogram.Component.MethodOption, boolean>> & Partial<WechatMiniprogram.Component.OtherOption> & Partial<WechatMiniprogram.Component.Lifetimes> & ThisType<WechatMiniprogram.Component.Instance<WechatMiniprogram.Component.DataOption, WechatMiniprogram.Component.PropertyOption, WechatMiniprogram.Component.MethodOption, WechatMiniprogram.IAnyObject, boolean>> & {
    [OBSERVER_KEY]?: any;
};
/**
 * 观察页面
 * @description 将页面转为响应式
 */
export declare const observerPage: <T extends ObservableTarget<WechatMiniprogram.Page.Constructor>>(target: T) => T;
/**
 * 观察组件
 * @description 将组件转为响应式
 */
export declare const observerComponent: <T extends ObservableTarget<WechatMiniprogram.Page.Constructor>>(target: T) => T;
/**
 * 响应式页面
 */
export declare const ReactivePage: WechatMiniprogram.Page.Constructor;
/**
 * 响应式组件
 */
export declare const ReactiveComponent: WechatMiniprogram.Component.Constructor;
/**
 * 自动观察
 * @description 自动观察 `Page` 以及 `Component`
 */
export declare const autoObserver: () => void;
