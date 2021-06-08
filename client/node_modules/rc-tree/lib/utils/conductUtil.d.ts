import { Key, DataEntity, DataNode, GetCheckDisabled } from '../interface';
interface ConductReturnType {
    checkedKeys: Key[];
    halfCheckedKeys: Key[];
}
export declare function isCheckDisabled(node: DataNode): boolean;
/**
 * Conduct with keys.
 * @param keyList current key list
 * @param keyEntities key - dataEntity map
 * @param mode `fill` to fill missing key, `clean` to remove useless key
 */
export declare function conductCheck(keyList: Key[], checked: true | {
    checked: false;
    halfCheckedKeys: Key[];
}, keyEntities: Record<Key, DataEntity>, getCheckDisabled?: GetCheckDisabled<DataNode>): ConductReturnType;
export {};
