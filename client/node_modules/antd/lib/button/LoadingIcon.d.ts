import React from 'react';
export interface LoadingIconProps {
    prefixCls: string;
    existIcon: boolean;
    loading?: boolean | object;
}
declare const LoadingIcon: React.FC<LoadingIconProps>;
export default LoadingIcon;
