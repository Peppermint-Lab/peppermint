/// <reference types="react" />
import type { FilterFunc } from 'rc-select/lib/interface/generator';
import type { FlattenDataNode, RawValueType, DataNode, DefaultValueType, LabelValueType, LegacyDataNode } from '../interface';
import type { SkipType } from '../hooks/useKeyValueMapping';
declare type CompatibleDataNode = Omit<FlattenDataNode, 'level'>;
export declare function toArray<T>(value: T | T[]): T[];
export declare function findValueOption(values: RawValueType[], options: CompatibleDataNode[]): DataNode[];
export declare function isValueDisabled(value: RawValueType, options: CompatibleDataNode[]): boolean;
export declare function isCheckDisabled(node: DataNode): boolean;
/**
 * Before reuse `rc-tree` logic, we need to add key since TreeSelect use `value` instead of `key`.
 */
export declare function flattenOptions(options: DataNode[]): FlattenDataNode[];
/** Filter options and return a new options by the search text */
export declare function filterOptions(searchValue: string, options: DataNode[], { optionFilterProp, filterOption, }: {
    optionFilterProp: string;
    filterOption: boolean | FilterFunc<LegacyDataNode>;
}): DataNode[];
export declare function getRawValueLabeled(values: RawValueType[], prevValue: DefaultValueType, getEntityByValue: (value: RawValueType, skipType?: SkipType, ignoreDisabledCheck?: boolean) => FlattenDataNode, getLabelProp: (node: DataNode) => React.ReactNode): LabelValueType[];
export declare function addValue(rawValues: RawValueType[], value: RawValueType): RawValueType[];
export declare function removeValue(rawValues: RawValueType[], value: RawValueType): RawValueType[];
export {};
