import * as React from 'react';
export declare const isValidElement: typeof React.isValidElement;
declare type AnyObject = Record<any, any>;
declare type RenderProps = undefined | AnyObject | ((originProps: AnyObject) => AnyObject | undefined);
export declare function replaceElement(element: React.ReactNode, replacement: React.ReactNode, props: RenderProps): React.ReactNode;
export declare function cloneElement(element: React.ReactNode, props?: RenderProps): React.ReactElement;
export {};
