import { TableRowSelection, Key, GetRowKey, TableLocale, SelectionItem, TransformColumns, ExpandType, GetPopupContainer } from '../interface';
export declare const SELECTION_ALL: "SELECT_ALL";
export declare const SELECTION_INVERT: "SELECT_INVERT";
export declare const SELECTION_NONE: "SELECT_NONE";
interface UseSelectionConfig<RecordType> {
    prefixCls: string;
    pageData: RecordType[];
    data: RecordType[];
    getRowKey: GetRowKey<RecordType>;
    getRecordByKey: (key: Key) => RecordType;
    expandType: ExpandType;
    childrenColumnName: string;
    expandIconColumnIndex?: number;
    locale: TableLocale;
    getPopupContainer?: GetPopupContainer;
}
export declare type INTERNAL_SELECTION_ITEM = SelectionItem | typeof SELECTION_ALL | typeof SELECTION_INVERT | typeof SELECTION_NONE;
export default function useSelection<RecordType>(rowSelection: TableRowSelection<RecordType> | undefined, config: UseSelectionConfig<RecordType>): [TransformColumns<RecordType>, Set<Key>];
export {};
