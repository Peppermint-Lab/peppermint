import * as React from 'react';
import { SkeletonTitleProps } from './Title';
import { SkeletonParagraphProps } from './Paragraph';
import { AvatarProps } from './Avatar';
interface SkeletonAvatarProps extends Omit<AvatarProps, 'active'> {
}
export interface SkeletonProps {
    active?: boolean;
    loading?: boolean;
    prefixCls?: string;
    className?: string;
    children?: React.ReactNode;
    avatar?: SkeletonAvatarProps | boolean;
    title?: SkeletonTitleProps | boolean;
    paragraph?: SkeletonParagraphProps | boolean;
    round?: boolean;
}
declare const Skeleton: {
    (props: SkeletonProps): JSX.Element;
    defaultProps: {
        avatar: boolean;
        title: boolean;
        paragraph: boolean;
    };
    Button: {
        (props: import("./Button").SkeletonButtonProps): JSX.Element;
        defaultProps: {
            size: string;
        };
    };
    Avatar: {
        (props: AvatarProps): JSX.Element;
        defaultProps: {
            size: string;
            shape: string;
        };
    };
    Input: {
        (props: import("./Input").SkeletonInputProps): JSX.Element;
        defaultProps: {
            size: string;
        };
    };
    Image: (props: import("./Image").SkeletonImageProps) => JSX.Element;
};
export default Skeleton;
