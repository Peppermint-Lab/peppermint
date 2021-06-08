import * as React from 'react';
import { AvatarSize } from './SizeContext';
export interface AvatarProps {
    /** Shape of avatar, options: `circle`, `square` */
    shape?: 'circle' | 'square';
    size?: AvatarSize;
    gap?: number;
    /** Src of image avatar */
    src?: React.ReactNode;
    /** Srcset of image avatar */
    srcSet?: string;
    draggable?: boolean;
    /** Icon to be used in avatar */
    icon?: React.ReactNode;
    style?: React.CSSProperties;
    prefixCls?: string;
    className?: string;
    children?: React.ReactNode;
    alt?: string;
    onError?: () => boolean;
}
declare const Avatar: React.ForwardRefExoticComponent<AvatarProps & React.RefAttributes<unknown>>;
export default Avatar;
