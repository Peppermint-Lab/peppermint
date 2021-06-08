import * as React from 'react';
export interface GeneratorProps {
    suffixCls: string;
    tagName: 'header' | 'footer' | 'main' | 'section';
    displayName: string;
}
export interface BasicProps extends React.HTMLAttributes<HTMLDivElement> {
    prefixCls?: string;
    hasSider?: boolean;
}
export interface LayoutContextProps {
    siderHook: {
        addSider: (id: string) => void;
        removeSider: (id: string) => void;
    };
}
export declare const LayoutContext: React.Context<LayoutContextProps>;
declare const Layout: React.FC<BasicProps>;
declare const Header: React.FC<BasicProps>;
declare const Footer: React.FC<BasicProps>;
declare const Content: React.FC<BasicProps>;
export { Header, Footer, Content };
export default Layout;
