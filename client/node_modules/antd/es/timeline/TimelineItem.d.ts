import * as React from 'react';
export interface TimelineItemProps {
    prefixCls?: string;
    className?: string;
    color?: string;
    dot?: React.ReactNode;
    pending?: boolean;
    position?: string;
    style?: React.CSSProperties;
    label?: React.ReactNode;
}
export interface TimeLineItemProps extends TimelineItemProps {
    __deprecated_do_not_use_it__?: any;
}
declare const TimelineItem: React.FC<TimelineItemProps>;
export default TimelineItem;
