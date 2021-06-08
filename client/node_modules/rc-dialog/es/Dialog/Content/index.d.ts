import * as React from 'react';
import type { IDialogChildProps } from '..';
export declare type ContentProps = {
    motionName: string;
    ariaId: string;
    onVisibleChanged: (visible: boolean) => void;
    onMouseDown: React.MouseEventHandler;
    onMouseUp: React.MouseEventHandler;
} & IDialogChildProps;
export declare type ContentRef = {
    focus: () => void;
    changeActive: (next: boolean) => void;
};
declare const Content: React.ForwardRefExoticComponent<{
    motionName: string;
    ariaId: string;
    onVisibleChanged: (visible: boolean) => void;
    onMouseDown: React.MouseEventHandler;
    onMouseUp: React.MouseEventHandler;
} & {
    getOpenCount: () => number;
    scrollLocker?: import("rc-util/lib/Dom/scrollLocker").default;
} & import("../..").DialogProps & React.RefAttributes<ContentRef>>;
export default Content;
