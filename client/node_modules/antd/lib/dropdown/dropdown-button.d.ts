import * as React from 'react';
import { ButtonHTMLType } from '../button/button';
import { ButtonGroupProps } from '../button/button-group';
import { DropDownProps } from './dropdown';
declare type DropdownButtonType = 'primary' | 'ghost' | 'dashed';
export interface DropdownButtonProps extends ButtonGroupProps, DropDownProps {
    type?: DropdownButtonType;
    htmlType?: ButtonHTMLType;
    disabled?: boolean;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    icon?: React.ReactNode;
    href?: string;
    children?: React.ReactNode;
    title?: string;
    buttonsRender?: (buttons: React.ReactNode[]) => React.ReactNode[];
}
interface DropdownButtonInterface extends React.FC<DropdownButtonProps> {
    __ANT_BUTTON: boolean;
}
declare const DropdownButton: DropdownButtonInterface;
export default DropdownButton;
