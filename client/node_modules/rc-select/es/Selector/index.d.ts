/**
 * Cursor rule:
 * 1. Only `showSearch` enabled
 * 2. Only `open` is `true`
 * 3. When typing, set `open` to `true` which hit rule of 2
 *
 * Accessibility:
 * - https://www.w3.org/TR/wai-aria-practices/examples/combobox/aria1.1pattern/listbox-combo.html
 */
import * as React from 'react';
import type { ScrollTo } from 'rc-virtual-list/lib/List';
import type { LabelValueType, RawValueType, CustomTagProps } from '../interface/generator';
import type { RenderNode, Mode } from '../interface';
export interface InnerSelectorProps {
    prefixCls: string;
    id: string;
    mode: Mode;
    inputRef: React.Ref<HTMLInputElement | HTMLTextAreaElement>;
    placeholder?: React.ReactNode;
    disabled?: boolean;
    autoFocus?: boolean;
    autoComplete?: string;
    values: LabelValueType[];
    showSearch?: boolean;
    searchValue: string;
    accessibilityIndex: number;
    open: boolean;
    tabIndex?: number;
    maxLength?: number;
    onInputKeyDown: React.KeyboardEventHandler<HTMLInputElement | HTMLTextAreaElement>;
    onInputMouseDown: React.MouseEventHandler<HTMLInputElement | HTMLTextAreaElement>;
    onInputChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
    onInputPaste: React.ClipboardEventHandler<HTMLInputElement | HTMLTextAreaElement>;
    onInputCompositionStart: React.CompositionEventHandler<HTMLInputElement | HTMLTextAreaElement>;
    onInputCompositionEnd: React.CompositionEventHandler<HTMLInputElement | HTMLTextAreaElement>;
}
export interface RefSelectorProps {
    focus: () => void;
    blur: () => void;
    scrollTo?: ScrollTo;
}
export interface SelectorProps {
    id: string;
    prefixCls: string;
    showSearch?: boolean;
    open: boolean;
    /** Display in the Selector value, it's not same as `value` prop */
    values: LabelValueType[];
    multiple: boolean;
    mode: Mode;
    searchValue: string;
    activeValue: string;
    inputElement: JSX.Element;
    autoFocus?: boolean;
    accessibilityIndex: number;
    tabIndex?: number;
    disabled?: boolean;
    placeholder?: React.ReactNode;
    removeIcon?: RenderNode;
    maxTagCount?: number | 'responsive';
    maxTagTextLength?: number;
    maxTagPlaceholder?: React.ReactNode | ((omittedValues: LabelValueType[]) => React.ReactNode);
    tagRender?: (props: CustomTagProps) => React.ReactElement;
    /** Check if `tokenSeparators` contains `\n` or `\r\n` */
    tokenWithEnter?: boolean;
    choiceTransitionName?: string;
    onToggleOpen: (open?: boolean) => void;
    /** `onSearch` returns go next step boolean to check if need do toggle open */
    onSearch: (searchText: string, fromTyping: boolean, isCompositing: boolean) => boolean;
    onSearchSubmit: (searchText: string) => void;
    onSelect: (value: RawValueType, option: {
        selected: boolean;
    }) => void;
    onInputKeyDown?: React.KeyboardEventHandler<HTMLInputElement | HTMLTextAreaElement>;
    /**
     * @private get real dom for trigger align.
     * This may be removed after React provides replacement of `findDOMNode`
     */
    domRef: React.Ref<HTMLDivElement>;
}
declare const ForwardSelector: React.ForwardRefExoticComponent<SelectorProps & React.RefAttributes<RefSelectorProps>>;
export default ForwardSelector;
