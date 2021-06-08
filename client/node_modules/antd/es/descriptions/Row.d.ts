import * as React from 'react';
import { DescriptionsItemProps } from './Item';
export interface RowProps {
    prefixCls: string;
    vertical: boolean;
    row: React.ReactElement<DescriptionsItemProps>[];
    bordered?: boolean;
    colon: boolean;
    index: number;
}
declare const Row: React.FC<RowProps>;
export default Row;
