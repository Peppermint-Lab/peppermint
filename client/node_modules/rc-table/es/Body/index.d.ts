import * as React from 'react';
import { GetRowKey, Key, GetComponentProps } from '../interface';
export interface BodyProps<RecordType> {
    data: readonly RecordType[];
    getRowKey: GetRowKey<RecordType>;
    measureColumnWidth: boolean;
    expandedKeys: Set<Key>;
    onRow: GetComponentProps<RecordType>;
    rowExpandable: (record: RecordType) => boolean;
    emptyNode: React.ReactNode;
    childrenColumnName: string;
}
declare function Body<RecordType>({ data, getRowKey, measureColumnWidth, expandedKeys, onRow, rowExpandable, emptyNode, childrenColumnName, }: BodyProps<RecordType>): JSX.Element;
declare const MemoBody: React.MemoExoticComponent<typeof Body>;
export default MemoBody;
