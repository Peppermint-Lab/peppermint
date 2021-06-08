import type { FlattenDataNode, Key, RawValueType } from '../interface';
export declare type SkipType = null | 'select' | 'checkbox';
export declare function isDisabled(dataNode: FlattenDataNode, skipType: SkipType): boolean;
export default function useKeyValueMapping(cacheKeyMap: Map<Key, FlattenDataNode>, cacheValueMap: Map<RawValueType, FlattenDataNode>): [
    (key: Key, skipType?: SkipType, ignoreDisabledCheck?: boolean) => FlattenDataNode,
    (value: RawValueType, skipType?: SkipType, ignoreDisabledCheck?: boolean) => FlattenDataNode
];
