import { RenderExpandIconProps, Key, GetRowKey } from '../interface';
export declare function renderExpandIcon<RecordType>({ prefixCls, record, onExpand, expanded, expandable, }: RenderExpandIconProps<RecordType>): JSX.Element;
export declare function findAllChildrenKeys<RecordType>(data: readonly RecordType[], getRowKey: GetRowKey<RecordType>, childrenColumnName: string): Key[];
