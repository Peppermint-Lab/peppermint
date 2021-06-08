import * as React from 'react';
export interface ContentProps {
    prefixCls?: string;
    overlay: (() => React.ReactNode) | React.ReactNode;
    id: string;
    overlayInnerStyle?: React.CSSProperties;
}
declare const Content: (props: ContentProps) => JSX.Element;
export default Content;
