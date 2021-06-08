/// <reference types="react" />
import type ScollLocker from 'rc-util/lib/Dom/scrollLocker';
import type { IDialogPropTypes } from '../IDialogPropTypes';
export declare type IDialogChildProps = {
    getOpenCount: () => number;
    scrollLocker?: ScollLocker;
} & IDialogPropTypes;
export default function Dialog(props: IDialogChildProps): JSX.Element;
