/// <reference types="react" />
import type { Components, RangeList, Locale } from '../interface';
export declare type RangesProps = {
    prefixCls: string;
    rangeList?: RangeList;
    components?: Components;
    needConfirmButton: boolean;
    onNow?: null | (() => void) | false;
    onOk?: null | (() => void) | false;
    okDisabled?: boolean;
    showNow?: boolean;
    locale: Locale;
};
export default function getRanges({ prefixCls, rangeList, components, needConfirmButton, onNow, onOk, okDisabled, showNow, locale, }: RangesProps): JSX.Element;
