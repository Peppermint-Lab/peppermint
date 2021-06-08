import * as React from 'react';
import { List } from 'rc-field-form';
import { FormProps as RcFormProps } from 'rc-field-form/lib/Form';
import { Options } from 'scroll-into-view-if-needed';
import { ColProps } from '../grid/col';
import { FormLabelAlign } from './interface';
import useForm, { FormInstance } from './hooks/useForm';
import { SizeType } from '../config-provider/SizeContext';
export declare type RequiredMark = boolean | 'optional';
export declare type FormLayout = 'horizontal' | 'inline' | 'vertical';
export interface FormProps<Values = any> extends Omit<RcFormProps<Values>, 'form'> {
    prefixCls?: string;
    colon?: boolean;
    name?: string;
    layout?: FormLayout;
    labelAlign?: FormLabelAlign;
    labelCol?: ColProps;
    wrapperCol?: ColProps;
    form?: FormInstance<Values>;
    size?: SizeType;
    scrollToFirstError?: Options | boolean;
    requiredMark?: RequiredMark;
    /** @deprecated Will warning in future branch. Pls use `requiredMark` instead. */
    hideRequiredMark?: boolean;
}
declare const Form: <Values = any>(props: FormProps<Values> & {
    children?: React.ReactNode;
} & {
    ref?: React.Ref<FormInstance<Values>> | undefined;
}) => React.ReactElement;
export { useForm, List, FormInstance };
export default Form;
