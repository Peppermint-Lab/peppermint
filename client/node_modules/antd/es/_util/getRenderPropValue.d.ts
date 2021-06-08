import * as React from 'react';
export declare type RenderFunction = () => React.ReactNode;
export declare const getRenderPropValue: (propValue?: React.ReactNode | RenderFunction) => React.ReactNode;
