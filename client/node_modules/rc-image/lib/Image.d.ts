import * as React from 'react';
import { GetContainer } from 'rc-util/lib/PortalWrapper';
import { PreviewProps } from './Preview';
import PreviewGroup from './PreviewGroup';
import { IDialogPropTypes } from 'rc-dialog/lib/IDialogPropTypes';
export interface ImagePreviewType extends Omit<IDialogPropTypes, 'mask' | 'visible' | 'closable' | 'prefixCls' | 'onClose' | 'afterClose' | 'wrapClassName'> {
    src?: string;
    visible?: boolean;
    onVisibleChange?: (value: boolean, prevValue: boolean) => void;
    getContainer?: GetContainer | false;
    mask?: React.ReactNode;
    maskClassName?: string;
    icons?: PreviewProps['icons'];
}
export interface ImageProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'placeholder' | 'onClick'> {
    src?: string;
    wrapperClassName?: string;
    wrapperStyle?: React.CSSProperties;
    prefixCls?: string;
    previewPrefixCls?: string;
    placeholder?: React.ReactNode;
    fallback?: string;
    preview?: boolean | ImagePreviewType;
    /**
     * @deprecated since version 3.2.1
     */
    onPreviewClose?: (value: boolean, prevValue: boolean) => void;
    onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
    onError?: (e: React.SyntheticEvent<HTMLImageElement, Event>) => void;
}
interface CompoundedComponent<P> extends React.FC<P> {
    PreviewGroup: typeof PreviewGroup;
}
declare const ImageInternal: CompoundedComponent<ImageProps>;
export default ImageInternal;
