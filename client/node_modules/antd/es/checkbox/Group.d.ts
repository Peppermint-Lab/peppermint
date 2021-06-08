import * as React from 'react';
import { CheckboxChangeEvent } from './Checkbox';
export declare type CheckboxValueType = string | number | boolean;
export interface CheckboxOptionType {
    label: React.ReactNode;
    value: CheckboxValueType;
    style?: React.CSSProperties;
    disabled?: boolean;
    onChange?: (e: CheckboxChangeEvent) => void;
}
export interface AbstractCheckboxGroupProps {
    prefixCls?: string;
    className?: string;
    options?: Array<CheckboxOptionType | string>;
    disabled?: boolean;
    style?: React.CSSProperties;
}
export interface CheckboxGroupProps extends AbstractCheckboxGroupProps {
    name?: string;
    defaultValue?: Array<CheckboxValueType>;
    value?: Array<CheckboxValueType>;
    onChange?: (checkedValue: Array<CheckboxValueType>) => void;
    children?: React.ReactNode;
}
export interface CheckboxGroupContext {
    name?: string;
    toggleOption?: (option: CheckboxOptionType) => void;
    value?: any;
    disabled?: boolean;
    registerValue: (val: string) => void;
    cancelValue: (val: string) => void;
}
export declare const GroupContext: React.Context<CheckboxGroupContext | null>;
declare const _default: React.MemoExoticComponent<React.ForwardRefExoticComponent<CheckboxGroupProps & React.RefAttributes<HTMLDivElement>>>;
export default _default;
