import * as React from 'react';
import { ConfigConsumerProps } from '../config-provider';
export default class Wave extends React.Component<{
    insertExtraNode?: boolean;
}> {
    static contextType: React.Context<ConfigConsumerProps>;
    private instance?;
    private containerRef;
    private extraNode;
    private clickWaveTimeoutId;
    private animationStartId;
    private animationStart;
    private destroyed;
    private csp?;
    context: ConfigConsumerProps;
    componentDidMount(): void;
    componentWillUnmount(): void;
    onClick: (node: HTMLElement, waveColor: string) => void;
    onTransitionStart: (e: AnimationEvent) => void;
    onTransitionEnd: (e: AnimationEvent) => void;
    getAttributeName(): string;
    bindAnimationEvent: (node: HTMLElement) => {
        cancel: () => void;
    } | undefined;
    resetEffect(node: HTMLElement): void;
    renderWave: ({ csp }: ConfigConsumerProps) => {} | null | undefined;
    render(): JSX.Element;
}
