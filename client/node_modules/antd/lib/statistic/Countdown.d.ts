import * as React from 'react';
import { StatisticProps } from './Statistic';
import { countdownValueType, FormatConfig } from './utils';
interface CountdownProps extends StatisticProps {
    value?: countdownValueType;
    format?: string;
    onFinish?: () => void;
}
declare class Countdown extends React.Component<CountdownProps, {}> {
    static defaultProps: Partial<CountdownProps>;
    countdownId?: number;
    componentDidMount(): void;
    componentDidUpdate(): void;
    componentWillUnmount(): void;
    syncTimer: () => void;
    startTimer: () => void;
    stopTimer: () => void;
    formatCountdown: (value: countdownValueType, config: FormatConfig) => string;
    valueRender: (node: React.ReactElement<HTMLDivElement>) => React.ReactElement<any, string | React.JSXElementConstructor<any>>;
    render(): JSX.Element;
}
export default Countdown;
