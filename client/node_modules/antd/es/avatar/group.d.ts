import * as React from 'react';
import { AvatarSize } from './SizeContext';
export interface GroupProps {
    className?: string;
    children?: React.ReactNode;
    style?: React.CSSProperties;
    prefixCls?: string;
    maxCount?: number;
    maxStyle?: React.CSSProperties;
    maxPopoverPlacement?: 'top' | 'bottom';
    size?: AvatarSize;
}
declare const Group: React.FC<GroupProps>;
export default Group;
