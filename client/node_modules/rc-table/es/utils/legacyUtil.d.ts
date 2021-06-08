import { ExpandableConfig, LegacyExpandableProps } from '../interface';
export declare const INTERNAL_COL_DEFINE = "RC_TABLE_INTERNAL_COL_DEFINE";
export declare function getExpandableProps<RecordType>(props: LegacyExpandableProps<RecordType> & {
    expandable?: ExpandableConfig<RecordType>;
}): ExpandableConfig<RecordType>;
/**
 * Returns only data- and aria- key/value pairs
 * @param {object} props
 */
export declare function getDataAndAriaProps(props: object): {};
