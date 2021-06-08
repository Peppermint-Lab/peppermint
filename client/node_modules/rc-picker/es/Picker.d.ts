/**
 * Removed:
 *  - getCalendarContainer: use `getPopupContainer` instead
 *  - onOk
 *
 * New Feature:
 *  - picker
 *  - allowEmpty
 *  - selectable
 *
 * Tips: Should add faq about `datetime` mode with `defaultValue`
 */
import * as React from 'react';
import type { AlignType } from 'rc-trigger/lib/interface';
import type { PickerPanelBaseProps, PickerPanelDateProps, PickerPanelTimeProps } from './PickerPanel';
import type { CustomFormat } from './interface';
export declare type PickerRefConfig = {
    focus: () => void;
    blur: () => void;
};
export declare type PickerSharedProps<DateType> = {
    dropdownClassName?: string;
    dropdownAlign?: AlignType;
    popupStyle?: React.CSSProperties;
    transitionName?: string;
    placeholder?: string;
    allowClear?: boolean;
    autoFocus?: boolean;
    disabled?: boolean;
    tabIndex?: number;
    open?: boolean;
    defaultOpen?: boolean;
    /** Make input readOnly to avoid popup keyboard in mobile */
    inputReadOnly?: boolean;
    id?: string;
    format?: string | CustomFormat<DateType> | (string | CustomFormat<DateType>)[];
    suffixIcon?: React.ReactNode;
    clearIcon?: React.ReactNode;
    prevIcon?: React.ReactNode;
    nextIcon?: React.ReactNode;
    superPrevIcon?: React.ReactNode;
    superNextIcon?: React.ReactNode;
    getPopupContainer?: (node: HTMLElement) => HTMLElement;
    panelRender?: (originPanel: React.ReactNode) => React.ReactNode;
    onChange?: (value: DateType | null, dateString: string) => void;
    onOpenChange?: (open: boolean) => void;
    onFocus?: React.FocusEventHandler<HTMLInputElement>;
    onBlur?: React.FocusEventHandler<HTMLInputElement>;
    onMouseDown?: React.MouseEventHandler<HTMLDivElement>;
    onMouseUp?: React.MouseEventHandler<HTMLDivElement>;
    onMouseEnter?: React.MouseEventHandler<HTMLDivElement>;
    onMouseLeave?: React.MouseEventHandler<HTMLDivElement>;
    onClick?: React.MouseEventHandler<HTMLDivElement>;
    onContextMenu?: React.MouseEventHandler<HTMLDivElement>;
    onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>, preventDefault: () => void) => void;
    /** @private Internal usage, do not use in production mode!!! */
    pickerRef?: React.MutableRefObject<PickerRefConfig>;
    role?: string;
    name?: string;
    autoComplete?: string;
    direction?: 'ltr' | 'rtl';
} & React.AriaAttributes;
declare type OmitPanelProps<Props> = Omit<Props, 'onChange' | 'hideHeader' | 'pickerValue' | 'onPickerValueChange'>;
export declare type PickerBaseProps<DateType> = {} & PickerSharedProps<DateType> & OmitPanelProps<PickerPanelBaseProps<DateType>>;
export declare type PickerDateProps<DateType> = {} & PickerSharedProps<DateType> & OmitPanelProps<PickerPanelDateProps<DateType>>;
export declare type PickerTimeProps<DateType> = {
    picker: 'time';
    /**
     * @deprecated Please use `defaultValue` directly instead
     * since `defaultOpenValue` will confuse user of current value status
     */
    defaultOpenValue?: DateType;
} & PickerSharedProps<DateType> & Omit<OmitPanelProps<PickerPanelTimeProps<DateType>>, 'format'>;
export declare type PickerProps<DateType> = PickerBaseProps<DateType> | PickerDateProps<DateType> | PickerTimeProps<DateType>;
declare class Picker<DateType> extends React.Component<PickerProps<DateType>> {
    pickerRef: React.RefObject<PickerRefConfig>;
    focus: () => void;
    blur: () => void;
    render(): JSX.Element;
}
export default Picker;
