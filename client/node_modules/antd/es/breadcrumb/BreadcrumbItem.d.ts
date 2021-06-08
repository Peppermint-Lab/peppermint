import * as React from 'react';
import { DropDownProps } from '../dropdown/dropdown';
export interface BreadcrumbItemProps {
    prefixCls?: string;
    separator?: React.ReactNode;
    href?: string;
    overlay?: DropDownProps['overlay'];
    dropdownProps?: DropDownProps;
    onClick?: React.MouseEventHandler<HTMLAnchorElement | HTMLSpanElement>;
    className?: string;
}
interface BreadcrumbItemInterface extends React.FC<BreadcrumbItemProps> {
    __ANT_BREADCRUMB_ITEM: boolean;
}
declare const BreadcrumbItem: BreadcrumbItemInterface;
export default BreadcrumbItem;
