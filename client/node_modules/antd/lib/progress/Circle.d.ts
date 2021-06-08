import * as React from 'react';
import { ProgressProps } from './progress';
interface CircleProps extends ProgressProps {
    prefixCls: string;
    children: React.ReactNode;
    progressStatus: string;
}
declare const Circle: React.FC<CircleProps>;
export default Circle;
