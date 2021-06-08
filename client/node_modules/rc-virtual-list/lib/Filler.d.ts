import * as React from 'react';
interface FillerProps {
    prefixCls?: string;
    /** Virtual filler height. Should be `count * itemMinHeight` */
    height: number;
    /** Set offset of visible items. Should be the top of start item position */
    offset?: number;
    children: React.ReactNode;
    onInnerResize?: () => void;
}
/**
 * Fill component to provided the scroll content real height.
 */
declare const Filler: React.ForwardRefExoticComponent<FillerProps & React.RefAttributes<HTMLDivElement>>;
export default Filler;
