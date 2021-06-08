import * as React from 'react';
import { NotificationInstance as RCNotificationInstance } from 'rc-notification/lib/Notification';
export declare type NotificationPlacement = 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';
export declare type IconType = 'success' | 'info' | 'error' | 'warning';
export interface ConfigProps {
    top?: number;
    bottom?: number;
    duration?: number;
    prefixCls?: string;
    placement?: NotificationPlacement;
    getContainer?: () => HTMLElement;
    closeIcon?: React.ReactNode;
    rtl?: boolean;
}
export interface ArgsProps {
    message: React.ReactNode;
    description?: React.ReactNode;
    btn?: React.ReactNode;
    key?: string;
    onClose?: () => void;
    duration?: number | null;
    icon?: React.ReactNode;
    placement?: NotificationPlacement;
    style?: React.CSSProperties;
    prefixCls?: string;
    className?: string;
    readonly type?: IconType;
    onClick?: () => void;
    top?: number;
    bottom?: number;
    getContainer?: () => HTMLElement;
    closeIcon?: React.ReactNode;
}
export interface NotificationInstance {
    success(args: ArgsProps): void;
    error(args: ArgsProps): void;
    info(args: ArgsProps): void;
    warning(args: ArgsProps): void;
    open(args: ArgsProps): void;
}
export interface NotificationApi extends NotificationInstance {
    warn(args: ArgsProps): void;
    close(key: string): void;
    config(options: ConfigProps): void;
    destroy(): void;
    useNotification: () => [NotificationInstance, React.ReactElement];
}
/** @private test Only function. Not work on production */
export declare const getInstance: (cacheKey: string) => Promise<RCNotificationInstance | null>;
declare const _default: NotificationApi;
export default _default;
