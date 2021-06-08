/**
 * Feature:
 *  - fixed not need to set width
 *  - support `rowExpandable` to config row expand logic
 *  - add `summary` to support `() => ReactNode`
 *
 * Update:
 *  - `dataIndex` is `array[]` now
 *  - `expandable` wrap all the expand related props
 *
 * Removed:
 *  - expandIconAsCell
 *  - useFixedHeader
 *  - rowRef
 *  - columns[number].onCellClick
 *  - onRowClick
 *  - onRowDoubleClick
 *  - onRowMouseEnter
 *  - onRowMouseLeave
 *  - getBodyWrapper
 *  - bodyStyle
 *
 * Deprecated:
 *  - All expanded props, move into expandable
 */
import * as React from 'react';
import type { GetRowKey, ColumnsType, TableComponents, DefaultRecordType, GetComponentProps, ExpandableConfig, LegacyExpandableProps, PanelRender, TableLayout, RowClassName, ColumnType, TableSticky } from './interface';
export declare const INTERNAL_HOOKS = "rc-table-internal-hook";
export interface TableProps<RecordType = unknown> extends LegacyExpandableProps<RecordType> {
    prefixCls?: string;
    className?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode;
    data?: readonly RecordType[];
    columns?: ColumnsType<RecordType>;
    rowKey?: string | GetRowKey<RecordType>;
    tableLayout?: TableLayout;
    scroll?: {
        x?: number | true | string;
        y?: number | string;
    };
    /** Config expand rows */
    expandable?: ExpandableConfig<RecordType>;
    indentSize?: number;
    rowClassName?: string | RowClassName<RecordType>;
    title?: PanelRender<RecordType>;
    footer?: PanelRender<RecordType>;
    summary?: (data: readonly RecordType[]) => React.ReactNode;
    id?: string;
    showHeader?: boolean;
    components?: TableComponents<RecordType>;
    onRow?: GetComponentProps<RecordType>;
    onHeaderRow?: GetComponentProps<readonly ColumnType<RecordType>[]>;
    emptyText?: React.ReactNode | (() => React.ReactNode);
    direction?: 'ltr' | 'rtl';
    /**
     * @private Internal usage, may remove by refactor. Should always use `columns` instead.
     *
     * !!! DO NOT USE IN PRODUCTION ENVIRONMENT !!!
     */
    internalHooks?: string;
    /**
     * @private Internal usage, may remove by refactor. Should always use `columns` instead.
     *
     * !!! DO NOT USE IN PRODUCTION ENVIRONMENT !!!
     */
    transformColumns?: (columns: ColumnsType<RecordType>) => ColumnsType<RecordType>;
    /**
     * @private Internal usage, may remove by refactor.
     *
     * !!! DO NOT USE IN PRODUCTION ENVIRONMENT !!!
     */
    internalRefs?: {
        body: React.MutableRefObject<HTMLDivElement>;
    };
    sticky?: boolean | TableSticky;
}
declare function Table<RecordType extends DefaultRecordType>(props: TableProps<RecordType>): JSX.Element;
declare namespace Table {
    var Column: typeof import("./sugar/Column").default;
    var ColumnGroup: typeof import("./sugar/ColumnGroup").default;
    var Summary: {
        Cell: typeof import("./Footer/Cell").default;
        Row: typeof import("./Footer/Row").default;
    };
    var defaultProps: {
        rowKey: string;
        prefixCls: string;
        emptyText: () => string;
    };
}
export default Table;
