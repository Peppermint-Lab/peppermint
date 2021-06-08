import * as React from 'react';
import type { OnSelect, PanelMode } from './interface';
export declare type ContextOperationRefProps = {
    onKeyDown?: (e: React.KeyboardEvent<HTMLElement>) => boolean;
    onClose?: () => void;
};
export declare type PanelContextProps = {
    operationRef?: React.MutableRefObject<ContextOperationRefProps | null>;
    /** Only work with time panel */
    hideHeader?: boolean;
    panelRef?: React.Ref<HTMLDivElement>;
    hidePrevBtn?: boolean;
    hideNextBtn?: boolean;
    onDateMouseEnter?: (date: any) => void;
    onDateMouseLeave?: (date: any) => void;
    onSelect?: OnSelect<any>;
    hideRanges?: boolean;
    open?: boolean;
    mode?: PanelMode;
    /** Only used for TimePicker and this is a deprecated prop */
    defaultOpenValue?: any;
};
declare const PanelContext: React.Context<PanelContextProps>;
export default PanelContext;
