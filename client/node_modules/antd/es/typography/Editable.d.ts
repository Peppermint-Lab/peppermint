import * as React from 'react';
import { AutoSizeType } from 'rc-textarea/lib/ResizableTextArea';
import { DirectionType } from '../config-provider';
interface EditableProps {
    prefixCls?: string;
    value: string;
    ['aria-label']?: string;
    onSave: (value: string) => void;
    onCancel: () => void;
    onEnd?: () => void;
    className?: string;
    style?: React.CSSProperties;
    direction?: DirectionType;
    maxLength?: number;
    autoSize?: boolean | AutoSizeType;
}
declare const Editable: React.FC<EditableProps>;
export default Editable;
