import * as React from 'react';
export declare type HeaderProps = {
    prefixCls: string;
    prevIcon?: React.ReactNode;
    nextIcon?: React.ReactNode;
    superPrevIcon?: React.ReactNode;
    superNextIcon?: React.ReactNode;
    /** Last one step */
    onPrev?: () => void;
    /** Next one step */
    onNext?: () => void;
    /** Last multiple steps */
    onSuperPrev?: () => void;
    /** Next multiple steps */
    onSuperNext?: () => void;
    children?: React.ReactNode;
};
declare function Header({ prefixCls, prevIcon, nextIcon, superPrevIcon, superNextIcon, onSuperPrev, onSuperNext, onPrev, onNext, children, }: HeaderProps): JSX.Element;
export default Header;
