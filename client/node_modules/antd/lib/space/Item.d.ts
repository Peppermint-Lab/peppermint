import * as React from 'react';
export interface ItemProps {
    className: string;
    children: React.ReactNode;
    index: number;
    direction?: 'horizontal' | 'vertical';
    marginDirection: 'marginLeft' | 'marginRight';
    split?: string | React.ReactNode;
    wrap?: boolean;
}
export default function Item({ className, direction, index, marginDirection, children, split, wrap, }: ItemProps): JSX.Element | null;
