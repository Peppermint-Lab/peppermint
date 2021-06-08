import * as React from 'react';
import { Tab, TabsLocale, EditableConfig } from '../interface';
export interface OperationNodeProps {
    prefixCls: string;
    className?: string;
    style?: React.CSSProperties;
    id: string;
    tabs: Tab[];
    rtl: boolean;
    tabBarGutter?: number;
    activeKey: string;
    mobile: boolean;
    moreIcon?: React.ReactNode;
    moreTransitionName?: string;
    editable?: EditableConfig;
    locale?: TabsLocale;
    onTabClick: (key: React.Key, e: React.MouseEvent | React.KeyboardEvent) => void;
}
declare const _default: React.ForwardRefExoticComponent<OperationNodeProps & React.RefAttributes<HTMLDivElement>>;
export default _default;
