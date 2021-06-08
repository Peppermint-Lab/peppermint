import React from 'react';
export interface StarProps {
    value?: number;
    index?: number;
    prefixCls?: string;
    allowHalf?: boolean;
    disabled?: boolean;
    onHover?: (e: React.MouseEvent<HTMLDivElement>, index: number) => void;
    onClick?: (e: React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>, index: number) => void;
    character?: React.ReactNode;
    characterRender?: (origin: React.ReactElement, props: StarProps) => React.ReactNode;
    focused?: boolean;
    count?: number;
}
export default class Star extends React.Component<StarProps> {
    onHover: React.MouseEventHandler<HTMLDivElement>;
    onClick: (e: any) => void;
    onKeyDown: React.KeyboardEventHandler<HTMLDivElement>;
    getClassName(): string;
    render(): React.ReactNode;
}
