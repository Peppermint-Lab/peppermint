/// <reference types="react" />
import { Key, DataIndex } from '../interface';
export declare function getPathValue<ValueType, ObjectType extends object>(record: ObjectType, path: DataIndex): ValueType;
interface GetColumnKeyColumn {
    key?: Key;
    dataIndex?: DataIndex;
}
export declare function getColumnsKey(columns: readonly GetColumnKeyColumn[]): import("react").Key[];
export declare function mergeObject<ReturnObject extends object>(...objects: Partial<ReturnObject>[]): ReturnObject;
export declare function validateValue<T>(val: T): boolean;
export {};
