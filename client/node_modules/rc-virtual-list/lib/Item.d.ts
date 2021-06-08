import * as React from 'react';
export interface ItemProps {
    children: React.ReactElement;
    setRef: (element: HTMLElement) => void;
}
export declare function Item({ children, setRef }: ItemProps): React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)>) | (new (props: any) => React.Component<any, any, any>)>;
