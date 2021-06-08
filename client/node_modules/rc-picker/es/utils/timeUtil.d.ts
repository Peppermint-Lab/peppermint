import type { NullableDateType } from '../interface';
import type { GenerateConfig } from '../generate';
export declare function setTime<DateType>(generateConfig: GenerateConfig<DateType>, date: DateType, hour: number, minute: number, second: number): DateType;
export declare function setDateTime<DateType>(generateConfig: GenerateConfig<DateType>, date: DateType, defaultDate: NullableDateType<DateType>): DateType;
export declare function getLowerBoundTime(hour: number, minute: number, second: number, hourStep: number, minuteStep: number, secondStep: number): [number, number, number];
export declare function getLastDay<DateType>(generateConfig: GenerateConfig<DateType>, date: DateType): string;
