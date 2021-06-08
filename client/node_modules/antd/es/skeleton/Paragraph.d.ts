import * as React from 'react';
declare type widthUnit = number | string;
export interface SkeletonParagraphProps {
    prefixCls?: string;
    className?: string;
    style?: React.CSSProperties;
    width?: widthUnit | Array<widthUnit>;
    rows?: number;
}
declare const Paragraph: (props: SkeletonParagraphProps) => JSX.Element;
export default Paragraph;
