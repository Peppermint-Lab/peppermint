import { TransformColumns, ColumnsType, ColumnType, Key, TableLocale, FilterValue, FilterKey, GetPopupContainer } from '../../interface';
export interface FilterState<RecordType> {
    column: ColumnType<RecordType>;
    key: Key;
    filteredKeys?: FilterKey;
    forceFiltered?: boolean;
}
export declare function getFilterData<RecordType>(data: RecordType[], filterStates: FilterState<RecordType>[]): RecordType[];
interface FilterConfig<RecordType> {
    prefixCls: string;
    dropdownPrefixCls: string;
    mergedColumns: ColumnsType<RecordType>;
    locale: TableLocale;
    onFilterChange: (filters: Record<string, FilterValue | null>, filterStates: FilterState<RecordType>[]) => void;
    getPopupContainer?: GetPopupContainer;
}
declare function useFilter<RecordType>({ prefixCls, dropdownPrefixCls, mergedColumns, onFilterChange, getPopupContainer, locale: tableLocale, }: FilterConfig<RecordType>): [
    TransformColumns<RecordType>,
    FilterState<RecordType>[],
    () => Record<string, FilterValue | null>
];
export default useFilter;
