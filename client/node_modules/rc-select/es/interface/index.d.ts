import type * as React from 'react';
import type { Key, RawValueType } from './generator';
export declare type RenderDOMFunc = (props: any) => HTMLElement;
export declare type RenderNode = React.ReactNode | ((props: any) => React.ReactNode);
export declare type Mode = 'multiple' | 'tags' | 'combobox';
export declare type OnActiveValue = (active: RawValueType, index: number, info?: {
    source?: 'keyboard' | 'mouse';
}) => void;
export interface OptionCoreData {
    key?: Key;
    disabled?: boolean;
    value: Key;
    title?: string;
    className?: string;
    style?: React.CSSProperties;
    label?: React.ReactNode;
    /** @deprecated Only works when use `children` as option data */
    children?: React.ReactNode;
}
export interface OptionData extends OptionCoreData {
    /** Save for customize data */
    [prop: string]: any;
}
export interface OptionGroupData {
    key?: Key;
    label?: React.ReactNode;
    options: OptionData[];
    className?: string;
    style?: React.CSSProperties;
    /** Save for customize data */
    [prop: string]: any;
}
export declare type OptionsType = (OptionData | OptionGroupData)[];
export interface FlattenOptionData {
    group?: boolean;
    groupOption?: boolean;
    key: string | number;
    data: OptionData | OptionGroupData;
}
