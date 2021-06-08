interface IndentProps {
    prefixCls: string;
    level: number;
    isStart: boolean[];
    isEnd: boolean[];
}
declare const Indent: ({ prefixCls, level, isStart, isEnd }: IndentProps) => JSX.Element;
export default Indent;
