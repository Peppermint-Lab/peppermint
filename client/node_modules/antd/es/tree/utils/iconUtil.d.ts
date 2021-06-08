import * as React from 'react';
import { AntTreeNodeProps } from '../Tree';
export default function renderSwitcherIcon(prefixCls: string, switcherIcon: React.ReactNode | null | undefined, showLine: boolean | {
    showLeafIcon: boolean;
} | undefined, { isLeaf, expanded, loading }: AntTreeNodeProps): {} | null;
