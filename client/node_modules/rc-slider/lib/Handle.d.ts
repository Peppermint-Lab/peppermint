import React from 'react';
export interface HandleProps {
    prefixCls?: string;
    className?: string;
    vertical?: boolean;
    reverse?: boolean;
    offset?: number;
    style?: React.CSSProperties;
    disabled?: boolean;
    min?: number;
    max?: number;
    value?: number;
    tabIndex?: number;
    ariaLabel?: string;
    ariaLabelledBy?: string;
    ariaValueTextFormatter?: (val: number) => string;
    onMouseEnter?: React.MouseEventHandler;
    onMouseLeave?: React.MouseEventHandler;
}
export default class Handle extends React.Component<HandleProps> {
    state: {
        clickFocused: boolean;
    };
    onMouseUpListener: {
        remove: () => void;
    };
    handle: HTMLElement;
    componentDidMount(): void;
    componentWillUnmount(): void;
    setHandleRef: (node: any) => void;
    setClickFocus(focused: any): void;
    handleMouseUp: () => void;
    handleMouseDown: (e: any) => void;
    handleBlur: () => void;
    handleKeyDown: () => void;
    clickFocus(): void;
    focus(): void;
    blur(): void;
    render(): JSX.Element;
}
