import * as React from 'react';
import { TabsProps as RcTabsProps, TabPaneProps } from 'rc-tabs';
import { SizeType } from '../config-provider/SizeContext';
export declare type TabsType = 'line' | 'card' | 'editable-card';
export declare type TabsPosition = 'top' | 'right' | 'bottom' | 'left';
export { TabPaneProps };
export interface TabsProps extends Omit<RcTabsProps, 'editable'> {
    type?: TabsType;
    size?: SizeType;
    hideAdd?: boolean;
    centered?: boolean;
    addIcon?: React.ReactNode;
    onEdit?: (e: React.MouseEvent | React.KeyboardEvent | string, action: 'add' | 'remove') => void;
}
declare function Tabs({ type, className, size: propSize, onEdit, hideAdd, centered, addIcon, ...props }: TabsProps): JSX.Element;
declare namespace Tabs {
    var TabPane: typeof import("rc-tabs").TabPane;
}
export default Tabs;
