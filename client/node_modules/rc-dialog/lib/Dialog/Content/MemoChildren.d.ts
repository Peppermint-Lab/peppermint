import * as React from 'react';
export declare type MemoChildrenProps = {
    shouldUpdate: boolean;
    children: React.ReactNode;
};
declare const _default: React.MemoExoticComponent<({ children }: MemoChildrenProps) => React.ReactElement<any, string | ((props: any) => React.ReactElement<any, any>) | (new (props: any) => React.Component<any, any, any>)>>;
export default _default;
