export declare type ValueType = string | number;
export interface DecimalClass {
    add: (value: ValueType) => DecimalClass;
    isEmpty: () => boolean;
    isNaN: () => boolean;
    isInvalidate: () => boolean;
    toNumber: () => number;
    /**
     * Parse value as string. Will return empty string if `isInvalidate`.
     * You can set `safe=false` to get origin string content.
     */
    toString: (safe?: boolean) => string;
    equals: (target: DecimalClass) => boolean;
    lessEquals: (target: DecimalClass) => boolean;
    negate: () => DecimalClass;
}
/**
 * We can remove this when IE not support anymore
 */
export declare class NumberDecimal implements DecimalClass {
    origin: string;
    number: number;
    empty: boolean;
    constructor(value: ValueType);
    negate(): NumberDecimal;
    add(value: ValueType): NumberDecimal;
    isEmpty(): boolean;
    isNaN(): boolean;
    isInvalidate(): boolean;
    equals(target: DecimalClass): boolean;
    lessEquals(target: DecimalClass): boolean;
    toNumber(): number;
    toString(safe?: boolean): string;
}
export declare class BigIntDecimal implements DecimalClass {
    origin: string;
    negative: boolean;
    integer: bigint;
    decimal: bigint;
    /** BigInt will convert `0009` to `9`. We need record the len of decimal */
    decimalLen: number;
    empty: boolean;
    nan: boolean;
    constructor(value: string | number);
    private getMark;
    private getIntegerStr;
    private getDecimalStr;
    /**
     * Align BigIntDecimal with same decimal length. e.g. 12.3 + 5 = 1230000
     * This is used for add function only.
     */
    private alignDecimal;
    negate(): BigIntDecimal;
    add(value: ValueType): BigIntDecimal;
    isEmpty(): boolean;
    isNaN(): boolean;
    isInvalidate(): boolean;
    equals(target: DecimalClass): boolean;
    lessEquals(target: DecimalClass): boolean;
    toNumber(): number;
    toString(safe?: boolean): string;
}
export default function getMiniDecimal(value: ValueType): DecimalClass;
/**
 * Align the logic of toFixed to around like 1.5 => 2
 */
export declare function toFixed(numStr: string, separatorStr: string, precision?: number): any;
