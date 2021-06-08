import * as React from 'react';
import { ScreenSizeMap } from '../_util/responsiveObserve';
export declare type AvatarSize = 'large' | 'small' | 'default' | number | ScreenSizeMap;
declare const SizeContext: React.Context<AvatarSize>;
export interface SizeContextProps {
    size?: AvatarSize;
}
export declare const SizeContextProvider: React.FC<SizeContextProps>;
export default SizeContext;
