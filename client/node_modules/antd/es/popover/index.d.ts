import * as React from 'react';
import { AbstractTooltipProps } from '../tooltip';
import { RenderFunction } from '../_util/getRenderPropValue';
export interface PopoverProps extends AbstractTooltipProps {
    title?: React.ReactNode | RenderFunction;
    content?: React.ReactNode | RenderFunction;
}
declare const Popover: React.ForwardRefExoticComponent<PopoverProps & React.RefAttributes<unknown>>;
export default Popover;
