import * as React from 'react';
import { ImagePreviewType } from './Image';
import { PreviewProps } from './Preview';
export interface PreviewGroupPreview extends Omit<ImagePreviewType, 'icons' | 'mask' | 'maskClassName'> {
    /**
     * If Preview the show img index
     * @default 0
     */
    current?: number;
}
export interface GroupConsumerProps {
    previewPrefixCls?: string;
    icons?: PreviewProps['icons'];
    preview?: boolean | PreviewGroupPreview;
}
interface PreviewUrl {
    url: string;
    canPreview: boolean;
}
export interface GroupConsumerValue extends GroupConsumerProps {
    isPreviewGroup?: boolean;
    previewUrls: Map<number, string>;
    setPreviewUrls: React.Dispatch<React.SetStateAction<Map<number, PreviewUrl>>>;
    current: number;
    setCurrent: React.Dispatch<React.SetStateAction<number>>;
    setShowPreview: React.Dispatch<React.SetStateAction<boolean>>;
    setMousePosition: React.Dispatch<React.SetStateAction<null | {
        x: number;
        y: number;
    }>>;
    registerImage: (id: number, url: string, canPreview?: boolean) => () => void;
}
export declare const context: React.Context<GroupConsumerValue>;
declare const Group: React.FC<GroupConsumerProps>;
export default Group;
