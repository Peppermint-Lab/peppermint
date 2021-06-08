import * as React from 'react';
interface ResizeContextProps {
    onColumnResize: (columnKey: React.Key, width: number) => void;
}
declare const ResizeContext: React.Context<ResizeContextProps>;
export default ResizeContext;
