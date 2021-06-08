/// <reference types="react" />
import { TableProps as RcTableProps } from 'rc-table/lib/Table';
import { SpinProps } from '../spin';
import { TooltipProps } from '../tooltip';
import { TableRowSelection, ColumnsType, TableCurrentDataSource, SorterResult, GetPopupContainer, TablePaginationConfig, SortOrder, TableLocale, FilterValue } from './interface';
import { SizeType } from '../config-provider/SizeContext';
export { ColumnsType, TablePaginationConfig };
export interface TableProps<RecordType> extends Omit<RcTableProps<RecordType>, 'transformColumns' | 'internalHooks' | 'internalRefs' | 'data' | 'columns' | 'scroll' | 'emptyText'> {
    dropdownPrefixCls?: string;
    dataSource?: RcTableProps<RecordType>['data'];
    columns?: ColumnsType<RecordType>;
    pagination?: false | TablePaginationConfig;
    loading?: boolean | SpinProps;
    size?: SizeType;
    bordered?: boolean;
    locale?: TableLocale;
    onChange?: (pagination: TablePaginationConfig, filters: Record<string, FilterValue | null>, sorter: SorterResult<RecordType> | SorterResult<RecordType>[], extra: TableCurrentDataSource<RecordType>) => void;
    rowSelection?: TableRowSelection<RecordType>;
    getPopupContainer?: GetPopupContainer;
    scroll?: RcTableProps<RecordType>['scroll'] & {
        scrollToFirstRowOnChange?: boolean;
    };
    sortDirections?: SortOrder[];
    showSorterTooltip?: boolean | TooltipProps;
}
declare function Table<RecordType extends object = any>(props: TableProps<RecordType>): JSX.Element;
declare namespace Table {
    var defaultProps: {
        rowKey: string;
    };
    var SELECTION_ALL: "SELECT_ALL";
    var SELECTION_INVERT: "SELECT_INVERT";
    var SELECTION_NONE: "SELECT_NONE";
    var Column: typeof import("./Column").default;
    var ColumnGroup: typeof import("./ColumnGroup").default;
    var Summary: {
        Cell: typeof import("rc-table/lib/Footer/Cell").default;
        Row: typeof import("rc-table/lib/Footer/Row").default;
    };
}
export default Table;
