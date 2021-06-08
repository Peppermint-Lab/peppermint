import type { RangeValue, PickerMode } from '../interface';
import type { GenerateConfig } from '../generate';
export default function useRangeViewDates<DateType>({ values, picker, defaultDates, generateConfig, }: {
    values: RangeValue<DateType>;
    picker: PickerMode;
    defaultDates: RangeValue<DateType> | undefined;
    generateConfig: GenerateConfig<DateType>;
}): [(activePickerIndex: 0 | 1) => DateType, (viewDate: DateType | null, index: 0 | 1) => void];
