import * as React from 'react';
import { MenuContextProps } from './MenuContext';
interface TitleEventEntity {
    key: string;
    domEvent: Event;
}
export interface SubMenuProps {
    rootPrefixCls?: string;
    className?: string;
    disabled?: boolean;
    level?: number;
    title?: React.ReactNode;
    icon?: React.ReactNode;
    style?: React.CSSProperties;
    onTitleClick?: (e: TitleEventEntity) => void;
    onTitleMouseEnter?: (e: TitleEventEntity) => void;
    onTitleMouseLeave?: (e: TitleEventEntity) => void;
    popupOffset?: [number, number];
    popupClassName?: string;
}
declare class SubMenu extends React.Component<SubMenuProps, any> {
    static contextType: React.Context<MenuContextProps>;
    static isSubMenu: number;
    renderTitle(inlineCollapsed: boolean): React.ReactNode;
    render(): JSX.Element;
}
export default SubMenu;
