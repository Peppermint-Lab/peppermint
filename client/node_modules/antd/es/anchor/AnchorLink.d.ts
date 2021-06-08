import * as React from 'react';
import { AntAnchor } from './Anchor';
import { ConfigConsumerProps } from '../config-provider';
export interface AnchorLinkProps {
    prefixCls?: string;
    href: string;
    target?: string;
    title: React.ReactNode;
    children?: React.ReactNode;
    className?: string;
}
declare class AnchorLink extends React.Component<AnchorLinkProps, any, AntAnchor> {
    static defaultProps: {
        href: string;
    };
    static contextType: React.Context<AntAnchor>;
    context: AntAnchor;
    componentDidMount(): void;
    componentDidUpdate({ href: prevHref }: AnchorLinkProps): void;
    componentWillUnmount(): void;
    handleClick: (e: React.MouseEvent<HTMLElement>) => void;
    renderAnchorLink: ({ getPrefixCls }: ConfigConsumerProps) => JSX.Element;
    render(): JSX.Element;
}
export default AnchorLink;
