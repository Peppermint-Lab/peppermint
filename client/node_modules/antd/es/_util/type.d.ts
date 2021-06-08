export declare type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export declare const tuple: <T extends string[]>(...args: T) => T;
export declare const tupleNum: <T extends number[]>(...args: T) => T;
/**
 * https://stackoverflow.com/a/59187769 Extract the type of an element of an array/tuple without
 * performing indexing
 */
export declare type ElementOf<T> = T extends (infer E)[] ? E : T extends readonly (infer F)[] ? F : never;
/** https://github.com/Microsoft/TypeScript/issues/29729 */
export declare type LiteralUnion<T extends U, U> = T | (U & {});
