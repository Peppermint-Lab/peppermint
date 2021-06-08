/// <reference types="react" />
import { SkeletonElementProps } from './Element';
export interface AvatarProps extends Omit<SkeletonElementProps, 'shape'> {
    shape?: 'circle' | 'square';
}
declare const SkeletonAvatar: {
    (props: AvatarProps): JSX.Element;
    defaultProps: {
        size: string;
        shape: string;
    };
};
export default SkeletonAvatar;
