import { CellType, StickyOffsets, ColumnType, CustomizeComponent, GetComponentProps } from '../interface';
export interface RowProps<RecordType> {
    cells: readonly CellType<RecordType>[];
    stickyOffsets: StickyOffsets;
    flattenColumns: readonly ColumnType<RecordType>[];
    rowComponent: CustomizeComponent;
    cellComponent: CustomizeComponent;
    onHeaderRow: GetComponentProps<readonly ColumnType<RecordType>[]>;
    index: number;
}
declare function HeaderRow<RecordType>({ cells, stickyOffsets, flattenColumns, rowComponent: RowComponent, cellComponent: CellComponent, onHeaderRow, index, }: RowProps<RecordType>): JSX.Element;
declare namespace HeaderRow {
    var displayName: string;
}
export default HeaderRow;
