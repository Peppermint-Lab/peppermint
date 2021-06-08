/// <reference types="react" />
import { SkeletonElementProps } from './Element';
export interface SkeletonImageProps extends Omit<SkeletonElementProps, 'size' | 'shape' | 'active'> {
}
declare const SkeletonImage: (props: SkeletonImageProps) => JSX.Element;
export default SkeletonImage;
