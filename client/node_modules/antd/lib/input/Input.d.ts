import * as React from 'react';
import Group from './Group';
import Search from './Search';
import TextArea from './TextArea';
import Password from './Password';
import { Omit, LiteralUnion } from '../_util/type';
import ClearableLabeledInput from './ClearableLabeledInput';
import { ConfigConsumerProps, DirectionType } from '../config-provider';
import { SizeType } from '../config-provider/SizeContext';
export interface InputFocusOptions extends FocusOptions {
    cursor?: 'start' | 'end' | 'all';
}
export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix' | 'type'> {
    prefixCls?: string;
    size?: SizeType;
    type?: LiteralUnion<'button' | 'checkbox' | 'color' | 'date' | 'datetime-local' | 'email' | 'file' | 'hidden' | 'image' | 'month' | 'number' | 'password' | 'radio' | 'range' | 'reset' | 'search' | 'submit' | 'tel' | 'text' | 'time' | 'url' | 'week', string>;
    onPressEnter?: React.KeyboardEventHandler<HTMLInputElement>;
    addonBefore?: React.ReactNode;
    addonAfter?: React.ReactNode;
    prefix?: React.ReactNode;
    suffix?: React.ReactNode;
    allowClear?: boolean;
    bordered?: boolean;
}
export declare function fixControlledValue<T>(value: T): "" | T;
export declare function resolveOnChange(target: HTMLInputElement | HTMLTextAreaElement, e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement> | React.MouseEvent<HTMLElement, MouseEvent> | React.CompositionEvent<HTMLElement>, onChange: undefined | ((event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void), targetValue?: string): void;
export declare function getInputClassName(prefixCls: string, bordered: boolean, size?: SizeType, disabled?: boolean, direction?: DirectionType): string;
export declare function triggerFocus(element?: HTMLInputElement | HTMLTextAreaElement, option?: InputFocusOptions): void;
export interface InputState {
    value: any;
    focused: boolean;
    /** `value` from prev props */
    prevValue: any;
}
declare class Input extends React.Component<InputProps, InputState> {
    static Group: typeof Group;
    static Search: typeof Search;
    static TextArea: typeof TextArea;
    static Password: typeof Password;
    static defaultProps: {
        type: string;
    };
    input: HTMLInputElement;
    clearableInput: ClearableLabeledInput;
    removePasswordTimeout: any;
    direction: DirectionType;
    constructor(props: InputProps);
    static getDerivedStateFromProps(nextProps: InputProps, { prevValue }: InputState): Partial<InputState>;
    componentDidMount(): void;
    componentDidUpdate(): void;
    getSnapshotBeforeUpdate(prevProps: InputProps): null;
    componentWillUnmount(): void;
    focus: (option?: InputFocusOptions | undefined) => void;
    blur(): void;
    setSelectionRange(start: number, end: number, direction?: 'forward' | 'backward' | 'none'): void;
    select(): void;
    saveClearableInput: (input: ClearableLabeledInput) => void;
    saveInput: (input: HTMLInputElement) => void;
    onFocus: React.FocusEventHandler<HTMLInputElement>;
    onBlur: React.FocusEventHandler<HTMLInputElement>;
    setValue(value: string, callback?: () => void): void;
    handleReset: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
    renderInput: (prefixCls: string, size: SizeType | undefined, bordered: boolean, input?: ConfigConsumerProps['input']) => JSX.Element;
    clearPasswordValueAttribute: () => void;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    renderComponent: ({ getPrefixCls, direction, input }: ConfigConsumerProps) => JSX.Element;
    render(): JSX.Element;
}
export default Input;
