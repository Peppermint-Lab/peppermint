import type { OptionsType as SelectOptionsType, OptionData, FlattenOptionData } from '../interface';
import type { FilterFunc, RawValueType, GetLabeledValue, DefaultValueType } from '../interface/generator';
/**
 * Flat options into flatten list.
 * We use `optionOnly` here is aim to avoid user use nested option group.
 * Here is simply set `key` to the index if not provided.
 */
export declare function flattenOptions(options: SelectOptionsType): FlattenOptionData[];
export declare function findValueOption(values: RawValueType[], options: FlattenOptionData[], { prevValueOptions }?: {
    prevValueOptions?: OptionData[];
}): OptionData[];
export declare const getLabeledValue: GetLabeledValue<FlattenOptionData[]>;
/** Filter options and return a new options by the search text */
export declare function filterOptions(searchValue: string, options: SelectOptionsType, { optionFilterProp, filterOption, }: {
    optionFilterProp: string;
    filterOption: boolean | FilterFunc<SelectOptionsType[number]>;
}): SelectOptionsType;
export declare function getSeparatedContent(text: string, tokens: string[]): string[];
export declare function isValueDisabled(value: RawValueType, options: FlattenOptionData[]): boolean;
/**
 * `tags` mode should fill un-list item into the option list
 */
export declare function fillOptionsWithMissingValue(options: SelectOptionsType, value: DefaultValueType, optionLabelProp: string, labelInValue: boolean): SelectOptionsType;
