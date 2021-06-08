import * as React from 'react';
import { ColProps } from '../grid/col';
import { FormLabelAlign } from './interface';
import { RequiredMark } from './Form';
import { TooltipProps } from '../tooltip';
export declare type WrapperTooltipProps = TooltipProps & {
    icon?: React.ReactElement;
};
export declare type LabelTooltipType = WrapperTooltipProps | React.ReactNode;
export interface FormItemLabelProps {
    colon?: boolean;
    htmlFor?: string;
    label?: React.ReactNode;
    labelAlign?: FormLabelAlign;
    labelCol?: ColProps;
    requiredMark?: RequiredMark;
    tooltip?: LabelTooltipType;
}
declare const FormItemLabel: React.FC<FormItemLabelProps & {
    required?: boolean;
    prefixCls: string;
}>;
export default FormItemLabel;
