import * as React from 'react';
import { ElementOf, Omit } from '../_util/type';
import { TransferListProps, RenderedItem } from './list';
import { KeyWiseTransferItem } from '.';
export declare const OmitProps: ["handleFilter", "handleClear", "checkedKeys"];
export declare type OmitProp = ElementOf<typeof OmitProps>;
declare type PartialTransferListProps<RecordType> = Omit<TransferListProps<RecordType>, OmitProp>;
export interface TransferListBodyProps<RecordType> extends PartialTransferListProps<RecordType> {
    filteredItems: RecordType[];
    filteredRenderItems: RenderedItem<RecordType>[];
    selectedKeys: string[];
}
interface TransferListBodyState {
    current: number;
}
declare class ListBody<RecordType extends KeyWiseTransferItem> extends React.Component<TransferListBodyProps<RecordType>, TransferListBodyState> {
    state: {
        current: number;
    };
    static getDerivedStateFromProps<T>({ filteredRenderItems, pagination }: TransferListBodyProps<T>, { current }: TransferListBodyState): {
        current: number;
    } | null;
    onItemSelect: (item: RecordType) => void;
    onItemRemove: (item: RecordType) => void;
    onPageChange: (current: number) => void;
    getItems: () => RenderedItem<RecordType>[];
    render(): JSX.Element;
}
export default ListBody;
