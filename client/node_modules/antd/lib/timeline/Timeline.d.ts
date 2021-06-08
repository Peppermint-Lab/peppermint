import * as React from 'react';
import { TimelineItemProps } from './TimelineItem';
export interface TimelineProps {
    prefixCls?: string;
    className?: string;
    /** 指定最后一个幽灵节点是否存在或内容 */
    pending?: React.ReactNode;
    pendingDot?: React.ReactNode;
    style?: React.CSSProperties;
    reverse?: boolean;
    mode?: 'left' | 'alternate' | 'right';
}
interface TimelineType extends React.FC<TimelineProps> {
    Item: React.FC<TimelineItemProps>;
}
declare const Timeline: TimelineType;
export default Timeline;
