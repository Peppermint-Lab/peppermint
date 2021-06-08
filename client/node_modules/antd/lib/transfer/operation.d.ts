import * as React from 'react';
import { DirectionType } from '../config-provider';
export interface TransferOperationProps {
    className?: string;
    leftArrowText?: string;
    rightArrowText?: string;
    moveToLeft?: React.MouseEventHandler<HTMLButtonElement>;
    moveToRight?: React.MouseEventHandler<HTMLButtonElement>;
    leftActive?: boolean;
    rightActive?: boolean;
    style?: React.CSSProperties;
    disabled?: boolean;
    direction?: DirectionType;
    oneWay?: boolean;
}
declare const Operation: ({ disabled, moveToLeft, moveToRight, leftArrowText, rightArrowText, leftActive, rightActive, className, style, direction, oneWay, }: TransferOperationProps) => JSX.Element;
export default Operation;
