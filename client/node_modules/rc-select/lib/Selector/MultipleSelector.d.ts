import * as React from 'react';
import type { LabelValueType, RawValueType, CustomTagProps } from '../interface/generator';
import type { RenderNode } from '../interface';
import type { InnerSelectorProps } from '.';
interface SelectorProps extends InnerSelectorProps {
    removeIcon?: RenderNode;
    maxTagCount?: number | 'responsive';
    maxTagTextLength?: number;
    maxTagPlaceholder?: React.ReactNode | ((omittedValues: LabelValueType[]) => React.ReactNode);
    tokenSeparators?: string[];
    tagRender?: (props: CustomTagProps) => React.ReactElement;
    onToggleOpen: (open?: boolean) => void;
    choiceTransitionName?: string;
    onSelect: (value: RawValueType, option: {
        selected: boolean;
    }) => void;
}
declare const SelectSelector: React.FC<SelectorProps>;
export default SelectSelector;
