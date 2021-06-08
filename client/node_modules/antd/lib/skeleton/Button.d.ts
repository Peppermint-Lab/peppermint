/// <reference types="react" />
import { SkeletonElementProps } from './Element';
export interface SkeletonButtonProps extends Omit<SkeletonElementProps, 'size'> {
    size?: 'large' | 'small' | 'default';
}
declare const SkeletonButton: {
    (props: SkeletonButtonProps): JSX.Element;
    defaultProps: {
        size: string;
    };
};
export default SkeletonButton;
