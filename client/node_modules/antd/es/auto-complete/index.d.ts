/**
 * TODO: 4.0
 *
 * - Remove `dataSource`
 * - `size` not work with customizeInput
 * - CustomizeInput not feedback `ENTER` key since accessibility enhancement
 */
import * as React from 'react';
import { InternalSelectProps, OptionType, RefSelectProps } from '../select';
export interface DataSourceItemObject {
    value: string;
    text: string;
}
export declare type DataSourceItemType = DataSourceItemObject | React.ReactNode;
export interface AutoCompleteProps extends Omit<InternalSelectProps<string>, 'inputIcon' | 'loading' | 'mode' | 'optionLabelProp' | 'labelInValue'> {
    dataSource?: DataSourceItemType[];
}
declare const RefAutoComplete: React.ForwardRefExoticComponent<AutoCompleteProps & React.RefAttributes<RefSelectProps>>;
declare type RefAutoCompleteWithOption = typeof RefAutoComplete & {
    Option: OptionType;
};
declare const _default: RefAutoCompleteWithOption;
export default _default;
