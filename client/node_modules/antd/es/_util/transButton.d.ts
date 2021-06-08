/**
 * Wrap of sub component which need use as Button capacity (like Icon component).
 *
 * This helps accessibility reader to tread as a interactive button to operation.
 */
import * as React from 'react';
interface TransButtonProps extends React.HTMLAttributes<HTMLDivElement> {
    onClick?: (e?: React.MouseEvent<HTMLDivElement>) => void;
    noStyle?: boolean;
    autoFocus?: boolean;
    disabled?: boolean;
}
declare const TransButton: React.ForwardRefExoticComponent<TransButtonProps & React.RefAttributes<HTMLDivElement>>;
export default TransButton;
