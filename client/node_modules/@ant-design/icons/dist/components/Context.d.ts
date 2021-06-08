/// <reference types="react" />
export interface IconContextProps {
    prefixCls?: string;
    csp?: {
        nonce?: string;
    };
}
declare const IconContext: import("react").Context<IconContextProps>;
export default IconContext;
