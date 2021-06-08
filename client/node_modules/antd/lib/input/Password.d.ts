import * as React from 'react';
import { InputProps } from './Input';
export interface PasswordProps extends InputProps {
    readonly inputPrefixCls?: string;
    readonly action?: string;
    visibilityToggle?: boolean;
    iconRender?: (visible: boolean) => React.ReactNode;
}
declare const Password: React.ForwardRefExoticComponent<PasswordProps & React.RefAttributes<any>>;
export default Password;
