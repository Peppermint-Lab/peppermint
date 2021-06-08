import * as React from 'react';
import { CascaderOption, CascaderFieldNames } from './Cascader';
interface MenusProps {
    value?: (string | number)[];
    activeValue?: (string | number)[];
    options?: CascaderOption[];
    prefixCls?: string;
    expandTrigger?: string;
    onSelect?: (targetOption: string[], index: number, e: React.KeyboardEvent<HTMLElement>) => void;
    visible?: boolean;
    dropdownMenuColumnStyle?: React.CSSProperties;
    defaultFieldNames?: CascaderFieldNames;
    fieldNames?: CascaderFieldNames;
    expandIcon?: React.ReactNode;
    loadingIcon?: React.ReactNode;
    onItemDoubleClick?: (targetOption: string[], index: number, e: React.MouseEvent<HTMLElement>) => void;
}
interface MenuItems {
    [index: number]: HTMLLIElement;
}
declare class Menus extends React.Component<MenusProps> {
    menuItems: MenuItems;
    delayTimer: number;
    static defaultProps: MenusProps;
    componentDidMount(): void;
    componentDidUpdate(prevProps: MenusProps): void;
    getFieldName(name: any): any;
    getOption(option: CascaderOption, menuIndex: number): JSX.Element;
    getActiveOptions(values?: CascaderOption[]): CascaderOption[];
    getShowOptions(): CascaderOption[][];
    delayOnSelect(onSelect: any, ...args: any[]): void;
    scrollActiveItemToView(): void;
    isActiveOption(option: any, menuIndex: any): boolean;
    saveMenuItem: (index: any) => (node: any) => void;
    render(): JSX.Element;
}
export default Menus;
