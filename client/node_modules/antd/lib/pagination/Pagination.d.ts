import * as React from 'react';
export interface PaginationProps {
    total?: number;
    defaultCurrent?: number;
    disabled?: boolean;
    current?: number;
    defaultPageSize?: number;
    pageSize?: number;
    onChange?: (page: number, pageSize?: number) => void;
    hideOnSinglePage?: boolean;
    showSizeChanger?: boolean;
    pageSizeOptions?: string[];
    onShowSizeChange?: (current: number, size: number) => void;
    showQuickJumper?: boolean | {
        goButton?: React.ReactNode;
    };
    showTitle?: boolean;
    showTotal?: (total: number, range: [number, number]) => React.ReactNode;
    size?: 'default' | 'small';
    responsive?: boolean;
    simple?: boolean;
    style?: React.CSSProperties;
    locale?: Object;
    className?: string;
    prefixCls?: string;
    selectPrefixCls?: string;
    itemRender?: (page: number, type: 'page' | 'prev' | 'next' | 'jump-prev' | 'jump-next', originalElement: React.ReactElement<HTMLElement>) => React.ReactNode;
    role?: string;
    showLessItems?: boolean;
}
export declare type PaginationPosition = 'top' | 'bottom' | 'both';
export interface PaginationConfig extends PaginationProps {
    position?: PaginationPosition;
}
export declare type PaginationLocale = any;
declare const Pagination: React.FC<PaginationProps>;
export default Pagination;
