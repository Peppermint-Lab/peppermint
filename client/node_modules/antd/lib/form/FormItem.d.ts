import * as React from 'react';
import { FormInstance } from 'rc-field-form';
import { FieldProps } from 'rc-field-form/lib/Field';
import { FormItemLabelProps, LabelTooltipType } from './FormItemLabel';
import { FormItemInputProps } from './FormItemInput';
declare const ValidateStatuses: ["success", "warning", "error", "validating", ""];
export declare type ValidateStatus = typeof ValidateStatuses[number];
declare type RenderChildren<Values = any> = (form: FormInstance<Values>) => React.ReactNode;
declare type RcFieldProps<Values = any> = Omit<FieldProps<Values>, 'children'>;
declare type ChildrenType<Values = any> = RenderChildren<Values> | React.ReactNode;
export interface FormItemProps<Values = any> extends FormItemLabelProps, FormItemInputProps, RcFieldProps<Values> {
    prefixCls?: string;
    noStyle?: boolean;
    style?: React.CSSProperties;
    className?: string;
    children?: ChildrenType<Values>;
    id?: string;
    hasFeedback?: boolean;
    validateStatus?: ValidateStatus;
    required?: boolean;
    hidden?: boolean;
    initialValue?: any;
    messageVariables?: Record<string, string>;
    tooltip?: LabelTooltipType;
    /** Auto passed by List render props. User should not use this. */
    fieldKey?: React.Key | React.Key[];
}
declare function FormItem<Values = any>(props: FormItemProps<Values>): React.ReactElement;
export default FormItem;
