import * as React from 'react';
import type { DataNode, LegacyDataNode, ChangeEventExtra, InnerDataNode, RawValueType } from '../interface';
export declare function convertChildrenToData(nodes: React.ReactNode): DataNode[];
export declare function fillLegacyProps(dataNode: DataNode): LegacyDataNode;
export declare function fillAdditionalInfo(extra: ChangeEventExtra, triggerValue: RawValueType, checkedValues: RawValueType[], treeData: InnerDataNode[], showPosition: boolean): void;
