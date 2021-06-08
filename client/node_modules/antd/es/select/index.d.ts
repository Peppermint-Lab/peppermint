import * as React from 'react';
import { Option, OptGroup, SelectProps as RcSelectProps } from 'rc-select';
import { OptionProps } from 'rc-select/lib/Option';
import { SizeType } from '../config-provider/SizeContext';
declare type RawValue = string | number;
export { OptionProps };
export declare type OptionType = typeof Option;
export interface LabeledValue {
    key?: string;
    value: RawValue;
    label: React.ReactNode;
}
export declare type SelectValue = RawValue | RawValue[] | LabeledValue | LabeledValue[] | undefined;
export interface InternalSelectProps<VT> extends Omit<RcSelectProps<VT>, 'mode'> {
    suffixIcon?: React.ReactNode;
    size?: SizeType;
    mode?: 'multiple' | 'tags' | 'SECRET_COMBOBOX_MODE_DO_NOT_USE';
    bordered?: boolean;
}
export interface SelectProps<VT> extends Omit<InternalSelectProps<VT>, 'inputIcon' | 'mode' | 'getInputElement' | 'backfill'> {
    mode?: 'multiple' | 'tags';
}
export interface RefSelectProps {
    focus: () => void;
    blur: () => void;
}
declare const SelectRef: <VT extends SelectValue = SelectValue>(props: SelectProps<VT> & {
    ref?: React.Ref<RefSelectProps> | undefined;
}) => React.ReactElement;
declare type InternalSelectType = typeof SelectRef;
interface SelectInterface extends InternalSelectType {
    SECRET_COMBOBOX_MODE_DO_NOT_USE: string;
    Option: typeof Option;
    OptGroup: typeof OptGroup;
}
declare const Select: SelectInterface;
export default Select;
