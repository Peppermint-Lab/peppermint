import * as React from 'react';
import type { HeaderProps } from './Header';
export interface FixedHeaderProps<RecordType> extends HeaderProps<RecordType> {
    noData: boolean;
    maxContentScroll: boolean;
    colWidths: readonly number[];
    columCount: number;
    direction: 'ltr' | 'rtl';
    fixHeader: boolean;
    offsetHeader: number;
    stickyClassName?: string;
    onScroll: (info: {
        currentTarget: HTMLDivElement;
        scrollLeft?: number;
    }) => void;
}
declare const FixedHeader: React.ForwardRefExoticComponent<FixedHeaderProps<unknown> & React.RefAttributes<HTMLDivElement>>;
export default FixedHeader;
