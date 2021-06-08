import * as React from 'react';
import Group from './button-group';
import { Omit } from '../_util/type';
import { SizeType } from '../config-provider/SizeContext';
declare const ButtonTypes: ["default", "primary", "ghost", "dashed", "link", "text"];
export declare type ButtonType = typeof ButtonTypes[number];
declare const ButtonShapes: ["circle", "round"];
export declare type ButtonShape = typeof ButtonShapes[number];
declare const ButtonHTMLTypes: ["submit", "button", "reset"];
export declare type ButtonHTMLType = typeof ButtonHTMLTypes[number];
export declare type LegacyButtonType = ButtonType | 'danger';
export declare function convertLegacyProps(type?: LegacyButtonType): ButtonProps;
export interface BaseButtonProps {
    type?: ButtonType;
    icon?: React.ReactNode;
    shape?: ButtonShape;
    size?: SizeType;
    loading?: boolean | {
        delay?: number;
    };
    prefixCls?: string;
    className?: string;
    ghost?: boolean;
    danger?: boolean;
    block?: boolean;
    children?: React.ReactNode;
}
export declare type AnchorButtonProps = {
    href: string;
    target?: string;
    onClick?: React.MouseEventHandler<HTMLElement>;
} & BaseButtonProps & Omit<React.AnchorHTMLAttributes<any>, 'type' | 'onClick'>;
export declare type NativeButtonProps = {
    htmlType?: ButtonHTMLType;
    onClick?: React.MouseEventHandler<HTMLElement>;
} & BaseButtonProps & Omit<React.ButtonHTMLAttributes<any>, 'type' | 'onClick'>;
export declare type ButtonProps = Partial<AnchorButtonProps & NativeButtonProps>;
interface CompoundedComponent extends React.ForwardRefExoticComponent<ButtonProps & React.RefAttributes<HTMLElement>> {
    Group: typeof Group;
    __ANT_BUTTON: boolean;
}
declare const Button: CompoundedComponent;
export default Button;
