import * as React from 'react';
import Ribbon from './Ribbon';
import { PresetColorType, PresetStatusColorType } from '../_util/colors';
import { LiteralUnion } from '../_util/type';
export { ScrollNumberProps } from './ScrollNumber';
interface CompoundedComponent extends React.FC<BadgeProps> {
    Ribbon: typeof Ribbon;
}
export interface BadgeProps {
    /** Number to show in badge */
    count?: React.ReactNode;
    showZero?: boolean;
    /** Max count to show */
    overflowCount?: number;
    /** Whether to show red dot without number */
    dot?: boolean;
    style?: React.CSSProperties;
    prefixCls?: string;
    scrollNumberPrefixCls?: string;
    className?: string;
    status?: PresetStatusColorType;
    color?: LiteralUnion<PresetColorType, string>;
    text?: React.ReactNode;
    size?: 'default' | 'small';
    offset?: [number | string, number | string];
    title?: string;
}
declare const Badge: CompoundedComponent;
export default Badge;
