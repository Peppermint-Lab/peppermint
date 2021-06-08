import { PickerMode } from 'rc-picker/lib/interface';
import { PickerLocale } from './generatePicker';
export declare function getPlaceholder(picker: PickerMode | undefined, locale: PickerLocale, customizePlaceholder?: string): string;
export declare function getRangePlaceholder(picker: PickerMode | undefined, locale: PickerLocale, customizePlaceholder?: [string, string]): [string, string] | undefined;
