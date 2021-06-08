import * as React from 'react';
import { TransferDirection, RenderResult, SelectAllLabel, TransferLocale, KeyWiseTransferItem } from './index';
import DefaultListBody, { TransferListBodyProps } from './ListBody';
import { PaginationType } from './interface';
export interface RenderedItem<RecordType> {
    renderedText: string;
    renderedEl: React.ReactNode;
    item: RecordType;
}
declare type RenderListFunction<T> = (props: TransferListBodyProps<T>) => React.ReactNode;
export interface TransferListProps<RecordType> extends TransferLocale {
    prefixCls: string;
    titleText: React.ReactNode;
    dataSource: RecordType[];
    filterOption?: (filterText: string, item: RecordType) => boolean;
    style?: React.CSSProperties;
    checkedKeys: string[];
    handleFilter: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onItemSelect: (key: string, check: boolean) => void;
    onItemSelectAll: (dataSource: string[], checkAll: boolean) => void;
    onItemRemove?: (keys: string[]) => void;
    handleClear: () => void;
    /** Render item */
    render?: (item: RecordType) => RenderResult;
    showSearch?: boolean;
    searchPlaceholder: string;
    itemUnit: string;
    itemsUnit: string;
    renderList?: RenderListFunction<RecordType>;
    footer?: (props: TransferListProps<RecordType>) => React.ReactNode;
    onScroll: (e: React.UIEvent<HTMLUListElement>) => void;
    disabled?: boolean;
    direction: TransferDirection;
    showSelectAll?: boolean;
    selectAllLabel?: SelectAllLabel;
    showRemove?: boolean;
    pagination?: PaginationType;
}
interface TransferListState {
    /** Filter input value */
    filterValue: string;
}
export default class TransferList<RecordType extends KeyWiseTransferItem> extends React.PureComponent<TransferListProps<RecordType>, TransferListState> {
    static defaultProps: {
        dataSource: never[];
        titleText: string;
        showSearch: boolean;
    };
    timer: number;
    triggerScrollTimer: number;
    defaultListBodyRef: React.RefObject<DefaultListBody<RecordType>>;
    constructor(props: TransferListProps<RecordType>);
    componentWillUnmount(): void;
    getCheckStatus(filteredItems: RecordType[]): "none" | "all" | "part";
    getFilteredItems(dataSource: RecordType[], filterValue: string): {
        filteredItems: RecordType[];
        filteredRenderItems: RenderedItem<RecordType>[];
    };
    handleFilter: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleClear: () => void;
    matchFilter: (text: string, item: RecordType) => boolean;
    getCurrentPageItems: () => void;
    renderListBody: (renderList: RenderListFunction<RecordType> | undefined, props: TransferListBodyProps<RecordType>) => {
        customize: boolean;
        bodyContent: React.ReactNode;
    };
    getListBody(prefixCls: string, searchPlaceholder: string, filterValue: string, filteredItems: RecordType[], notFoundContent: React.ReactNode, filteredRenderItems: RenderedItem<RecordType>[], checkedKeys: string[], renderList?: RenderListFunction<RecordType>, showSearch?: boolean, disabled?: boolean): React.ReactNode;
    getCheckBox(filteredItems: RecordType[], onItemSelectAll: (dataSource: string[], checkAll: boolean) => void, showSelectAll?: boolean, disabled?: boolean, prefixCls?: string): false | JSX.Element;
    renderItem: (item: RecordType) => RenderedItem<RecordType>;
    getSelectAllLabel: (selectedCount: number, totalCount: number) => React.ReactNode;
    render(): JSX.Element;
}
export {};
