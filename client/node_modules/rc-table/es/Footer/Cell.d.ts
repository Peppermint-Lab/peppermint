import * as React from 'react';
import { AlignType } from '../interface';
export interface SummaryCellProps {
    className?: string;
    children?: React.ReactNode;
    index: number;
    colSpan?: number;
    rowSpan?: number;
    align?: AlignType;
}
export default function SummaryCell({ className, index, children, colSpan, rowSpan, align, }: SummaryCellProps): JSX.Element;
