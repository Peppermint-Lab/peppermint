/// <reference types="react" />
export declare type RenderIconType = React.ReactNode | ((props: any) => React.ReactNode);
export interface MenuInfo {
    key: React.Key;
    keyPath: React.Key[];
    item: React.ReactInstance;
    domEvent: React.MouseEvent<HTMLElement>;
}
export interface SelectInfo extends MenuInfo {
    selectedKeys?: React.Key[];
}
export declare type SelectEventHandler = (info: SelectInfo) => void;
export declare type HoverEventHandler = (info: {
    key: React.Key;
    hover: boolean;
}) => void;
export declare type MenuHoverEventHandler = (info: {
    key: React.Key;
    domEvent: React.MouseEvent<HTMLElement>;
}) => void;
export declare type MenuClickEventHandler = (info: MenuInfo) => void;
export declare type DestroyEventHandler = (key: React.Key) => void;
export declare type OpenEventHandler = (keys: React.Key[] | {
    key: React.Key;
    item: React.ReactInstance;
    trigger: string;
    open: boolean;
}) => void;
export declare type MenuMode = 'horizontal' | 'vertical' | 'vertical-left' | 'vertical-right' | 'inline';
export declare type OpenAnimation = string | Record<string, any>;
export interface MiniStore {
    getState: () => any;
    setState: (state: any) => void;
    subscribe: (listener: () => void) => () => void;
}
export declare type LegacyFunctionRef = (node: React.ReactInstance) => void;
export declare type BuiltinPlacements = Record<string, any>;
export declare type TriggerSubMenuAction = 'click' | 'hover';
