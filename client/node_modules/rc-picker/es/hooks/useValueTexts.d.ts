import type { GenerateConfig } from '../generate';
import type { CustomFormat, Locale } from '../interface';
export declare type ValueTextConfig<DateType> = {
    formatList: (string | CustomFormat<DateType>)[];
    generateConfig: GenerateConfig<DateType>;
    locale: Locale;
};
export default function useValueTexts<DateType>(value: DateType | null, { formatList, generateConfig, locale }: ValueTextConfig<DateType>): [string[], string];
