import * as React from 'react';
import { ModalFuncProps } from '../Modal';
export interface HookModalProps {
    afterClose: () => void;
    config: ModalFuncProps;
}
export interface HookModalRef {
    destroy: () => void;
    update: (config: ModalFuncProps) => void;
}
declare const _default: React.ForwardRefExoticComponent<HookModalProps & React.RefAttributes<HookModalRef>>;
export default _default;
