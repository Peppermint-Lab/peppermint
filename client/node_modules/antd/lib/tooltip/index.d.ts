import * as React from 'react';
import { TooltipProps as RcTooltipProps } from 'rc-tooltip/lib/Tooltip';
import { placements as Placements } from 'rc-tooltip/lib/placements';
import { AdjustOverflow, PlacementsConfig } from './placements';
import { PresetColorType } from '../_util/colors';
import { LiteralUnion } from '../_util/type';
export { AdjustOverflow, PlacementsConfig };
export declare type TooltipPlacement = 'top' | 'left' | 'right' | 'bottom' | 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight' | 'leftTop' | 'leftBottom' | 'rightTop' | 'rightBottom';
export interface TooltipAlignConfig {
    points?: [string, string];
    offset?: [number | string, number | string];
    targetOffset?: [number | string, number | string];
    overflow?: {
        adjustX: boolean;
        adjustY: boolean;
    };
    useCssRight?: boolean;
    useCssBottom?: boolean;
    useCssTransform?: boolean;
}
export interface AbstractTooltipProps extends Partial<Omit<RcTooltipProps, 'children'>> {
    style?: React.CSSProperties;
    className?: string;
    color?: LiteralUnion<PresetColorType, string>;
    placement?: TooltipPlacement;
    builtinPlacements?: typeof Placements;
    openClassName?: string;
    arrowPointAtCenter?: boolean;
    autoAdjustOverflow?: boolean | AdjustOverflow;
    getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement;
    children?: React.ReactNode;
}
export declare type RenderFunction = () => React.ReactNode;
export interface TooltipPropsWithOverlay extends AbstractTooltipProps {
    title?: React.ReactNode | RenderFunction;
    overlay: React.ReactNode | RenderFunction;
}
export interface TooltipPropsWithTitle extends AbstractTooltipProps {
    title: React.ReactNode | RenderFunction;
    overlay?: React.ReactNode | RenderFunction;
}
export declare type TooltipProps = TooltipPropsWithTitle | TooltipPropsWithOverlay;
declare const Tooltip: React.ForwardRefExoticComponent<TooltipProps & React.RefAttributes<unknown>>;
export default Tooltip;
