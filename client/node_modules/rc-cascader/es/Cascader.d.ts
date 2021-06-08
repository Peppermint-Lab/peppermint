import * as React from 'react';
import { BuildInPlacements, TriggerProps } from 'rc-trigger';
export interface CascaderFieldNames {
    value?: string | number;
    label?: string;
    children?: string;
}
export declare type CascaderValueType = (string | number)[];
export interface CascaderOption {
    value?: string | number;
    label?: React.ReactNode;
    disabled?: boolean;
    isLeaf?: boolean;
    loading?: boolean;
    children?: CascaderOption[];
    [key: string]: any;
}
export interface CascaderProps extends Pick<TriggerProps, 'getPopupContainer'> {
    value?: CascaderValueType;
    defaultValue?: CascaderValueType;
    options?: CascaderOption[];
    onChange?: (value: CascaderValueType, selectOptions: CascaderOption[]) => void;
    onPopupVisibleChange?: (popupVisible: boolean) => void;
    popupVisible?: boolean;
    disabled?: boolean;
    transitionName?: string;
    popupClassName?: string;
    popupPlacement?: string;
    prefixCls?: string;
    dropdownMenuColumnStyle?: React.CSSProperties;
    dropdownRender?: (menu: React.ReactElement) => React.ReactElement;
    builtinPlacements?: BuildInPlacements;
    loadData?: (selectOptions: CascaderOption[]) => void;
    changeOnSelect?: boolean;
    children?: React.ReactElement;
    onKeyDown?: (e: React.KeyboardEvent<HTMLElement>) => void;
    expandTrigger?: string;
    fieldNames?: CascaderFieldNames;
    filedNames?: CascaderFieldNames;
    expandIcon?: React.ReactNode;
    loadingIcon?: React.ReactNode;
}
interface CascaderState {
    popupVisible?: boolean;
    activeValue?: CascaderValueType;
    value?: CascaderValueType;
    prevProps?: CascaderProps;
}
declare class Cascader extends React.Component<CascaderProps, CascaderState> {
    defaultFieldNames: object;
    trigger: any;
    constructor(props: CascaderProps);
    static defaultProps: CascaderProps;
    static getDerivedStateFromProps(nextProps: CascaderProps, prevState: CascaderState): CascaderState;
    getPopupDOMNode(): any;
    getFieldName(name: string): string;
    getFieldNames(): CascaderFieldNames;
    getCurrentLevelOptions(): CascaderOption[];
    getActiveOptions(activeValue: CascaderValueType): CascaderOption[];
    setPopupVisible: (popupVisible: boolean) => void;
    handleChange: (options: CascaderOption[], { visible }: {
        visible: any;
    }, e: React.KeyboardEvent<HTMLElement>) => void;
    handlePopupVisibleChange: (popupVisible: boolean) => void;
    handleMenuSelect: (targetOption: CascaderOption, menuIndex: number, e: React.KeyboardEvent<HTMLElement>) => void;
    handleItemDoubleClick: () => void;
    handleKeyDown: (e: React.KeyboardEvent<HTMLElement>) => void;
    saveTrigger: (node: any) => void;
    render(): JSX.Element;
}
export default Cascader;
