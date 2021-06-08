import type { DataEntity } from 'rc-tree/lib/interface';
import type { RawValueType, Key } from '../interface';
export declare const SHOW_ALL = "SHOW_ALL";
export declare const SHOW_PARENT = "SHOW_PARENT";
export declare const SHOW_CHILD = "SHOW_CHILD";
export declare type CheckedStrategy = typeof SHOW_ALL | typeof SHOW_PARENT | typeof SHOW_CHILD;
export declare function formatStrategyKeys(keys: Key[], strategy: CheckedStrategy, keyEntities: Record<Key, DataEntity>): RawValueType[];
