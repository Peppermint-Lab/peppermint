import React from 'react';
import Star, { StarProps } from './Star';
declare function noop(): void;
export interface RateProps {
    disabled?: boolean;
    value?: number;
    defaultValue?: number;
    count?: number;
    allowHalf?: boolean;
    allowClear?: boolean;
    style?: React.CSSProperties;
    prefixCls?: string;
    onChange?: (value: number) => void;
    onHoverChange?: (value: number) => void;
    className?: string;
    character?: React.ReactNode;
    characterRender?: (origin: React.ReactElement, props: StarProps) => React.ReactNode;
    tabIndex?: number;
    onFocus?: () => void;
    onBlur?: () => void;
    onKeyDown?: React.KeyboardEventHandler<HTMLUListElement>;
    autoFocus?: boolean;
    direction?: string;
}
interface RateState {
    value: number;
    cleanedValue: number;
    hoverValue?: number;
    focused: boolean;
}
declare class Rate extends React.Component<RateProps, RateState> {
    static defaultProps: {
        defaultValue: number;
        count: number;
        allowHalf: boolean;
        allowClear: boolean;
        style: {};
        prefixCls: string;
        onChange: typeof noop;
        character: string;
        onHoverChange: typeof noop;
        tabIndex: number;
        direction: string;
    };
    stars: Record<string, Star>;
    rate: HTMLUListElement;
    constructor(props: RateProps);
    componentDidMount(): void;
    onHover: (event: React.MouseEvent<HTMLDivElement>, index: number) => void;
    onMouseLeave: () => void;
    onClick: (event: React.MouseEvent | React.KeyboardEvent, index: number) => void;
    onFocus: () => void;
    onBlur: () => void;
    onKeyDown: React.KeyboardEventHandler<HTMLUListElement>;
    static getDerivedStateFromProps(nextProps: RateProps, state: RateState): RateState;
    getStarDOM(index: number): HTMLElement;
    getStarValue(index: number, x: number): number;
    saveRef: (index: number) => (node: Star) => void;
    saveRate: (node: HTMLUListElement) => void;
    focus(): void;
    blur(): void;
    changeValue(value: number): void;
    render(): JSX.Element;
}
export default Rate;
