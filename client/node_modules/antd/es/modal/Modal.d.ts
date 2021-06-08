import * as React from 'react';
import useModal from './useModal';
import { LegacyButtonType, ButtonProps } from '../button/button';
import { DirectionType } from '../config-provider';
export declare const destroyFns: Array<() => void>;
export interface ModalProps {
    /** 对话框是否可见 */
    visible?: boolean;
    /** 确定按钮 loading */
    confirmLoading?: boolean;
    /** 标题 */
    title?: React.ReactNode | string;
    /** 是否显示右上角的关闭按钮 */
    closable?: boolean;
    /** 点击确定回调 */
    onOk?: (e: React.MouseEvent<HTMLElement>) => void;
    /** 点击模态框右上角叉、取消按钮、Props.maskClosable 值为 true 时的遮罩层或键盘按下 Esc 时的回调 */
    onCancel?: (e: React.MouseEvent<HTMLElement>) => void;
    afterClose?: () => void;
    /** 垂直居中 */
    centered?: boolean;
    /** 宽度 */
    width?: string | number;
    /** 底部内容 */
    footer?: React.ReactNode;
    /** 确认按钮文字 */
    okText?: React.ReactNode;
    /** 确认按钮类型 */
    okType?: LegacyButtonType;
    /** 取消按钮文字 */
    cancelText?: React.ReactNode;
    /** 点击蒙层是否允许关闭 */
    maskClosable?: boolean;
    /** 强制渲染 Modal */
    forceRender?: boolean;
    okButtonProps?: ButtonProps;
    cancelButtonProps?: ButtonProps;
    destroyOnClose?: boolean;
    style?: React.CSSProperties;
    wrapClassName?: string;
    maskTransitionName?: string;
    transitionName?: string;
    className?: string;
    getContainer?: string | HTMLElement | getContainerFunc | false | null;
    zIndex?: number;
    bodyStyle?: React.CSSProperties;
    maskStyle?: React.CSSProperties;
    mask?: boolean;
    keyboard?: boolean;
    wrapProps?: any;
    prefixCls?: string;
    closeIcon?: React.ReactNode;
    modalRender?: (node: React.ReactNode) => React.ReactNode;
    focusTriggerAfterClose?: boolean;
}
declare type getContainerFunc = () => HTMLElement;
export interface ModalFuncProps {
    prefixCls?: string;
    className?: string;
    visible?: boolean;
    title?: React.ReactNode;
    closable?: boolean;
    content?: React.ReactNode;
    onOk?: (...args: any[]) => any;
    onCancel?: (...args: any[]) => any;
    afterClose?: () => void;
    okButtonProps?: ButtonProps;
    cancelButtonProps?: ButtonProps;
    centered?: boolean;
    width?: string | number;
    okText?: React.ReactNode;
    okType?: LegacyButtonType;
    cancelText?: React.ReactNode;
    icon?: React.ReactNode;
    mask?: boolean;
    maskClosable?: boolean;
    zIndex?: number;
    okCancel?: boolean;
    style?: React.CSSProperties;
    maskStyle?: React.CSSProperties;
    type?: 'info' | 'success' | 'error' | 'warn' | 'warning' | 'confirm';
    keyboard?: boolean;
    getContainer?: string | HTMLElement | getContainerFunc | false | null;
    autoFocusButton?: null | 'ok' | 'cancel';
    transitionName?: string;
    maskTransitionName?: string;
    direction?: DirectionType;
    bodyStyle?: React.CSSProperties;
    closeIcon?: React.ReactNode;
    modalRender?: (node: React.ReactNode) => React.ReactNode;
    focusTriggerAfterClose?: boolean;
}
export interface ModalLocale {
    okText: string;
    cancelText: string;
    justOkText: string;
}
interface ModalInterface extends React.FC<ModalProps> {
    useModal: typeof useModal;
}
declare const Modal: ModalInterface;
export default Modal;
