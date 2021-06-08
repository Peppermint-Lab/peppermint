import React from 'react';
import type { GenericSliderProps } from './interface';
export interface ComponentWrapperProps {
    tipFormatter?: (value: number) => React.ReactNode;
    tipProps?: {
        prefixCls?: string;
        overlay?: string;
        placement?: string;
        visible?: boolean;
    };
    getTooltipContainer?: () => HTMLElement;
}
interface ComponentWrapperState {
    visibles: Record<number, boolean>;
}
export default function createSliderWithTooltip<Props extends GenericSliderProps>(Component: React.ComponentClass<Props>): {
    new (props: (ComponentWrapperProps & Props) | Readonly<ComponentWrapperProps & Props>): {
        state: {
            visibles: {};
        };
        handleTooltipVisibleChange: (index: any, visible: any) => void;
        handleWithTooltip: ({ value, dragging, index, disabled, ...restProps }: {
            [x: string]: any;
            value: any;
            dragging: any;
            index: any;
            disabled: any;
        }) => JSX.Element;
        render(): JSX.Element;
        context: any;
        setState<K extends "visibles">(state: ComponentWrapperState | ((prevState: Readonly<ComponentWrapperState>, props: Readonly<ComponentWrapperProps & Props>) => ComponentWrapperState | Pick<ComponentWrapperState, K>) | Pick<ComponentWrapperState, K>, callback?: () => void): void;
        forceUpdate(callback?: () => void): void;
        readonly props: Readonly<ComponentWrapperProps & Props> & Readonly<{
            children?: React.ReactNode;
        }>;
        refs: {
            [key: string]: React.ReactInstance;
        };
        componentDidMount?(): void;
        shouldComponentUpdate?(nextProps: Readonly<ComponentWrapperProps & Props>, nextState: Readonly<ComponentWrapperState>, nextContext: any): boolean;
        componentWillUnmount?(): void;
        componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void;
        getSnapshotBeforeUpdate?(prevProps: Readonly<ComponentWrapperProps & Props>, prevState: Readonly<ComponentWrapperState>): any;
        componentDidUpdate?(prevProps: Readonly<ComponentWrapperProps & Props>, prevState: Readonly<ComponentWrapperState>, snapshot?: any): void;
        componentWillMount?(): void;
        UNSAFE_componentWillMount?(): void;
        componentWillReceiveProps?(nextProps: Readonly<ComponentWrapperProps & Props>, nextContext: any): void;
        UNSAFE_componentWillReceiveProps?(nextProps: Readonly<ComponentWrapperProps & Props>, nextContext: any): void;
        componentWillUpdate?(nextProps: Readonly<ComponentWrapperProps & Props>, nextState: Readonly<ComponentWrapperState>, nextContext: any): void;
        UNSAFE_componentWillUpdate?(nextProps: Readonly<ComponentWrapperProps & Props>, nextState: Readonly<ComponentWrapperState>, nextContext: any): void;
    };
    new (props: ComponentWrapperProps & Props, context: any): {
        state: {
            visibles: {};
        };
        handleTooltipVisibleChange: (index: any, visible: any) => void;
        handleWithTooltip: ({ value, dragging, index, disabled, ...restProps }: {
            [x: string]: any;
            value: any;
            dragging: any;
            index: any;
            disabled: any;
        }) => JSX.Element;
        render(): JSX.Element;
        context: any;
        setState<K extends "visibles">(state: ComponentWrapperState | ((prevState: Readonly<ComponentWrapperState>, props: Readonly<ComponentWrapperProps & Props>) => ComponentWrapperState | Pick<ComponentWrapperState, K>) | Pick<ComponentWrapperState, K>, callback?: () => void): void;
        forceUpdate(callback?: () => void): void;
        readonly props: Readonly<ComponentWrapperProps & Props> & Readonly<{
            children?: React.ReactNode;
        }>;
        refs: {
            [key: string]: React.ReactInstance;
        };
        componentDidMount?(): void;
        shouldComponentUpdate?(nextProps: Readonly<ComponentWrapperProps & Props>, nextState: Readonly<ComponentWrapperState>, nextContext: any): boolean;
        componentWillUnmount?(): void;
        componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void;
        getSnapshotBeforeUpdate?(prevProps: Readonly<ComponentWrapperProps & Props>, prevState: Readonly<ComponentWrapperState>): any;
        componentDidUpdate?(prevProps: Readonly<ComponentWrapperProps & Props>, prevState: Readonly<ComponentWrapperState>, snapshot?: any): void;
        componentWillMount?(): void;
        UNSAFE_componentWillMount?(): void;
        componentWillReceiveProps?(nextProps: Readonly<ComponentWrapperProps & Props>, nextContext: any): void;
        UNSAFE_componentWillReceiveProps?(nextProps: Readonly<ComponentWrapperProps & Props>, nextContext: any): void;
        componentWillUpdate?(nextProps: Readonly<ComponentWrapperProps & Props>, nextState: Readonly<ComponentWrapperState>, nextContext: any): void;
        UNSAFE_componentWillUpdate?(nextProps: Readonly<ComponentWrapperProps & Props>, nextState: Readonly<ComponentWrapperState>, nextContext: any): void;
    };
    defaultProps: {
        tipFormatter(value: number): number;
        handleStyle: {}[];
        tipProps: {};
        getTooltipContainer: (node: any) => any;
    };
    contextType?: React.Context<any>;
};
export {};
