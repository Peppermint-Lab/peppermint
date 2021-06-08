import type { GenerateConfig } from '../generate';
import type { RangeValue, NullableDateType } from '../interface';
export default function useCellClassName<DateType>({ cellPrefixCls, generateConfig, rangedValue, hoverRangedValue, isInView, isSameCell, offsetCell, today, value, }: {
    cellPrefixCls: string;
    generateConfig: GenerateConfig<DateType>;
    isSameCell: (current: NullableDateType<DateType>, target: NullableDateType<DateType>) => boolean;
    offsetCell: (date: DateType, offset: number) => DateType;
    isInView: (date: DateType) => boolean;
    rangedValue?: RangeValue<DateType>;
    hoverRangedValue?: RangeValue<DateType>;
    today?: NullableDateType<DateType>;
    value?: NullableDateType<DateType>;
}): (currentDate: DateType) => {
    [x: string]: boolean;
};
