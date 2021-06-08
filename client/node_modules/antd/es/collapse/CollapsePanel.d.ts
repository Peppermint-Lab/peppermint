import * as React from 'react';
export declare type CollapsibleType = 'header' | 'disabled';
export interface CollapsePanelProps {
    key: string | number;
    header: React.ReactNode;
    /** @deprecated Use `collapsible="disabled"` instead */
    disabled?: boolean;
    className?: string;
    style?: React.CSSProperties;
    showArrow?: boolean;
    prefixCls?: string;
    forceRender?: boolean;
    id?: string;
    extra?: React.ReactNode;
    collapsible?: CollapsibleType;
}
declare const CollapsePanel: React.FC<CollapsePanelProps>;
export default CollapsePanel;
