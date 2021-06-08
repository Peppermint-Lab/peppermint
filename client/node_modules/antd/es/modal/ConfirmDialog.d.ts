/// <reference types="react" />
import { ModalFuncProps } from './Modal';
interface ConfirmDialogProps extends ModalFuncProps {
    afterClose?: () => void;
    close: (...args: any[]) => void;
    autoFocusButton?: null | 'ok' | 'cancel';
    rootPrefixCls: string;
}
declare const ConfirmDialog: (props: ConfirmDialogProps) => JSX.Element;
export default ConfirmDialog;
