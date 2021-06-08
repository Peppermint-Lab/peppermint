import * as React from 'react';
import { CSSMotionProps } from './CSSMotion';
import { KeyObject } from './util/diff';
export interface CSSMotionListProps extends Omit<CSSMotionProps, 'onVisibleChanged'> {
    keys: (React.Key | {
        key: React.Key;
        [name: string]: any;
    })[];
    component?: string | React.ComponentType | false;
    /** This will always trigger after final visible changed. Even if no motion configured. */
    onVisibleChanged?: (visible: boolean, info: {
        key: React.Key;
    }) => void;
}
export interface CSSMotionListState {
    keyEntities: KeyObject[];
}
/**
 * Generate a CSSMotionList component with config
 * @param transitionSupport No need since CSSMotionList no longer depends on transition support
 * @param CSSMotion CSSMotion component
 */
export declare function genCSSMotionList(transitionSupport: boolean, CSSMotion?: React.ForwardRefExoticComponent<CSSMotionProps & {
    ref?: React.Ref<any>;
}>): React.ComponentClass<CSSMotionListProps>;
declare const _default: React.ComponentClass<CSSMotionListProps, any>;
export default _default;
