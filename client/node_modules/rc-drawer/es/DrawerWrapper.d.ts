import * as React from 'react';
import type { IDrawerProps } from './IDrawerPropTypes';
interface IState {
    open: boolean;
}
declare class DrawerWrapper extends React.Component<IDrawerProps, IState> {
    static defaultProps: {
        prefixCls: string;
        placement: string;
        getContainer: string;
        defaultOpen: boolean;
        level: string;
        duration: string;
        ease: string;
        onChange: () => void;
        afterVisibleChange: () => void;
        handler: JSX.Element;
        showMask: boolean;
        maskClosable: boolean;
        maskStyle: {};
        wrapperClassName: string;
        className: string;
        keyboard: boolean;
        forceRender: boolean;
    };
    static getDerivedStateFromProps(props: IDrawerProps, { prevProps }: {
        prevProps: IDrawerProps;
    }): {
        open?: boolean;
        prevProps: IDrawerProps;
    };
    dom: HTMLElement | null;
    constructor(props: IDrawerProps);
    private onHandleClick;
    private onClose;
    render(): JSX.Element;
}
export default DrawerWrapper;
