import * as React from 'react';
import { LiteralUnion } from '../_util/type';
import { PresetColorType } from '../_util/colors';
declare type RibbonPlacement = 'start' | 'end';
export interface RibbonProps {
    className?: string;
    prefixCls?: string;
    style?: React.CSSProperties;
    text?: React.ReactNode;
    color?: LiteralUnion<PresetColorType, string>;
    children?: React.ReactNode;
    placement?: RibbonPlacement;
}
declare const Ribbon: React.FC<RibbonProps>;
export default Ribbon;
