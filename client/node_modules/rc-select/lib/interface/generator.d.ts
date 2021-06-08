/// <reference types="react" />
import type { SelectProps, RefSelectProps } from '../generate';
export declare type SelectSource = 'option' | 'selection' | 'input';
export declare const INTERNAL_PROPS_MARK = "RC_SELECT_INTERNAL_PROPS_MARK";
export declare type Key = string | number;
export declare type RawValueType = string | number;
export interface LabelValueType {
    key?: Key;
    value?: RawValueType;
    label?: React.ReactNode;
    isCacheable?: boolean;
}
export declare type DefaultValueType = RawValueType | RawValueType[] | LabelValueType | LabelValueType[];
export interface DisplayLabelValueType extends LabelValueType {
    disabled?: boolean;
}
export declare type SingleType<MixType> = MixType extends (infer Single)[] ? Single : MixType;
export declare type OnClear = () => void;
export declare type CustomTagProps = {
    label: React.ReactNode;
    value: DefaultValueType;
    disabled: boolean;
    onClose: (event?: React.MouseEvent<HTMLElement, MouseEvent>) => void;
    closable: boolean;
};
export declare type GetLabeledValue<FOT extends FlattenOptionsType> = (value: RawValueType, config: {
    options: FOT;
    prevValueMap: Map<RawValueType, LabelValueType>;
    labelInValue: boolean;
    optionLabelProp: string;
}) => LabelValueType;
export declare type FilterOptions<OptionsType extends object[]> = (searchValue: string, options: OptionsType, 
/** Component props, since Select & TreeSelect use different prop name, use any here */
config: {
    optionFilterProp: string;
    filterOption: boolean | FilterFunc<OptionsType[number]>;
}) => OptionsType;
export declare type FilterFunc<OptionType> = (inputValue: string, option?: OptionType) => boolean;
export declare function RefSelectFunc<OptionsType extends object[], ValueType>(Component: React.RefForwardingComponent<RefSelectProps, SelectProps<OptionsType, ValueType>>): React.ForwardRefExoticComponent<React.PropsWithoutRef<SelectProps<OptionsType, ValueType>> & React.RefAttributes<RefSelectProps>>;
export declare type FlattenOptionsType<OptionsType extends object[] = object[]> = {
    key: Key;
    data: OptionsType[number];
    /** Used for customize data */
    [name: string]: any;
}[];
