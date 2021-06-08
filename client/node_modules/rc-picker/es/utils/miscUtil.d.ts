export declare function leftPad(str: string | number, length: number, fill?: string): string;
export declare const tuple: <T extends string[]>(...args: T) => T;
export declare function toArray<T>(val: T | T[]): T[];
export default function getDataOrAriaProps(props: any): any;
export declare function getValue<T>(values: null | undefined | (T | null)[], index: number): T | null;
declare type UpdateValue<T> = (prev: T) => T;
export declare function updateValues<T, R = [T | null, T | null] | null>(values: [T | null, T | null] | null, value: T | UpdateValue<T>, index: number): R;
export {};
