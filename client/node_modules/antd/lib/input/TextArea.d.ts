import * as React from 'react';
import { TextAreaProps as RcTextAreaProps } from 'rc-textarea';
import ResizableTextArea from 'rc-textarea/lib/ResizableTextArea';
import { InputFocusOptions } from './Input';
import { SizeType } from '../config-provider/SizeContext';
interface ShowCountProps {
    formatter: (args: {
        count: number;
        maxLength?: number;
    }) => string;
}
export interface TextAreaProps extends RcTextAreaProps {
    allowClear?: boolean;
    bordered?: boolean;
    showCount?: boolean | ShowCountProps;
    size?: SizeType;
}
export interface TextAreaRef {
    focus: (options?: InputFocusOptions) => void;
    blur: () => void;
    resizableTextArea?: ResizableTextArea;
}
declare const TextArea: React.ForwardRefExoticComponent<TextAreaProps & React.RefAttributes<TextAreaRef>>;
export default TextArea;
