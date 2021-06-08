import * as React from 'react';
import DropdownButton from './dropdown-button';
declare const Placements: ["topLeft", "topCenter", "topRight", "bottomLeft", "bottomCenter", "bottomRight"];
declare type Placement = typeof Placements[number];
declare type OverlayFunc = () => React.ReactElement;
declare type Align = {
    points?: [string, string];
    offset?: [number, number];
    targetOffset?: [number, number];
    overflow?: {
        adjustX?: boolean;
        adjustY?: boolean;
    };
    useCssRight?: boolean;
    useCssBottom?: boolean;
    useCssTransform?: boolean;
};
export interface DropDownProps {
    arrow?: boolean;
    trigger?: ('click' | 'hover' | 'contextMenu')[];
    overlay: React.ReactElement | OverlayFunc;
    onVisibleChange?: (visible: boolean) => void;
    visible?: boolean;
    disabled?: boolean;
    align?: Align;
    getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement;
    prefixCls?: string;
    className?: string;
    transitionName?: string;
    placement?: Placement;
    overlayClassName?: string;
    overlayStyle?: React.CSSProperties;
    forceRender?: boolean;
    mouseEnterDelay?: number;
    mouseLeaveDelay?: number;
    openClassName?: string;
}
interface DropdownInterface extends React.FC<DropDownProps> {
    Button: typeof DropdownButton;
}
declare const Dropdown: DropdownInterface;
export default Dropdown;
