import * as React from 'react';
import Input from '../input';
import { ConfigConsumerProps, RenderEmptyHandler, DirectionType } from '../config-provider';
import { SizeType } from '../config-provider/SizeContext';
export interface CascaderOptionType {
    value?: string | number;
    label?: React.ReactNode;
    disabled?: boolean;
    isLeaf?: boolean;
    loading?: boolean;
    children?: Array<CascaderOptionType>;
    [key: string]: any;
}
export interface FieldNamesType {
    value?: string | number;
    label?: string;
    children?: string;
}
export interface FilledFieldNamesType {
    value: string | number;
    label: string;
    children: string;
}
export declare type CascaderExpandTrigger = 'click' | 'hover';
export declare type CascaderValueType = (string | number)[];
export interface ShowSearchType {
    filter?: (inputValue: string, path: CascaderOptionType[], names: FilledFieldNamesType) => boolean;
    render?: (inputValue: string, path: CascaderOptionType[], prefixCls: string | undefined, names: FilledFieldNamesType) => React.ReactNode;
    sort?: (a: CascaderOptionType[], b: CascaderOptionType[], inputValue: string, names: FilledFieldNamesType) => number;
    matchInputWidth?: boolean;
    limit?: number | false;
}
export interface CascaderProps {
    /** 可选项数据源 */
    options: CascaderOptionType[];
    /** 默认的选中项 */
    defaultValue?: CascaderValueType;
    /** 指定选中项 */
    value?: CascaderValueType;
    /** 选择完成后的回调 */
    onChange?: (value: CascaderValueType, selectedOptions?: CascaderOptionType[]) => void;
    /** 选择后展示的渲染函数 */
    displayRender?: (label: string[], selectedOptions?: CascaderOptionType[]) => React.ReactNode;
    /** 自定义样式 */
    style?: React.CSSProperties;
    /** 自定义类名 */
    className?: string;
    /** 自定义浮层类名 */
    popupClassName?: string;
    /** 浮层预设位置：`bottomLeft` `bottomRight` `topLeft` `topRight` */
    popupPlacement?: string;
    /** 输入框占位文本 */
    placeholder?: string;
    /** 输入框大小，可选 `large` `default` `small` */
    size?: SizeType;
    /** 输入框 name */
    name?: string;
    /** 输入框 id */
    id?: string;
    /** Whether has border style */
    bordered?: boolean;
    /** 禁用 */
    disabled?: boolean;
    /** 是否支持清除 */
    allowClear?: boolean;
    /** 自动获取焦点 */
    autoFocus?: boolean;
    showSearch?: boolean | ShowSearchType;
    notFoundContent?: React.ReactNode;
    loadData?: (selectedOptions?: CascaderOptionType[]) => void;
    /** 次级菜单的展开方式，可选 'click' 和 'hover' */
    expandTrigger?: CascaderExpandTrigger;
    expandIcon?: React.ReactNode;
    /** 当此项为 true 时，点选每级菜单选项值都会发生变化 */
    changeOnSelect?: boolean;
    /** 浮层可见变化时回调 */
    onPopupVisibleChange?: (popupVisible: boolean) => void;
    prefixCls?: string;
    inputPrefixCls?: string;
    getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement;
    popupVisible?: boolean;
    /** Use this after antd@3.7.0 */
    fieldNames?: FieldNamesType;
    suffixIcon?: React.ReactNode;
    dropdownRender?: (menus: React.ReactNode) => React.ReactNode;
    autoComplete?: string;
    transitionName?: string;
    children?: React.ReactElement;
}
export interface CascaderState {
    inputFocused: boolean;
    inputValue: string;
    value: CascaderValueType;
    popupVisible: boolean | undefined;
    flattenOptions: CascaderOptionType[][] | undefined;
    prevProps: CascaderProps;
}
interface CascaderLocale {
    placeholder?: string;
}
declare class Cascader extends React.Component<CascaderProps, CascaderState> {
    static defaultProps: {
        options: never[];
        disabled: boolean;
        allowClear: boolean;
        bordered: boolean;
    };
    static getDerivedStateFromProps(nextProps: CascaderProps, { prevProps }: CascaderState): Partial<CascaderState>;
    cachedOptions: CascaderOptionType[];
    clearSelectionTimeout: any;
    private input;
    constructor(props: CascaderProps);
    componentWillUnmount(): void;
    setValue: (value: CascaderValueType, selectedOptions?: CascaderOptionType[]) => void;
    getLabel(): any;
    saveInput: (node: Input) => void;
    handleChange: (value: any, selectedOptions: CascaderOptionType[]) => void;
    handlePopupVisibleChange: (popupVisible: boolean) => void;
    handleInputBlur: () => void;
    handleInputClick: (e: React.MouseEvent<HTMLInputElement>) => void;
    handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    clearSelection: (e: React.MouseEvent<HTMLElement>) => void;
    generateFilteredOptions(prefixCls: string | undefined, renderEmpty: RenderEmptyHandler): CascaderOptionType[] | {
        [x: string]: {} | null | undefined;
        disabled: boolean;
        isEmptyNode: boolean;
    }[];
    focus(): void;
    blur(): void;
    getPopupPlacement(direction?: DirectionType): string;
    renderCascader: ({ getPopupContainer: getContextPopupContainer, getPrefixCls, renderEmpty, direction, }: ConfigConsumerProps, locale: CascaderLocale) => JSX.Element;
    render(): JSX.Element;
}
export default Cascader;
