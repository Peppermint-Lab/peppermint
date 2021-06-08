import * as React from 'react';
import { IconBaseProps } from './Icon';
export interface CustomIconOptions {
    scriptUrl?: string | string[];
    extraCommonProps?: {
        [key: string]: any;
    };
}
export interface IconFontProps extends IconBaseProps {
    type: string;
}
export default function create(options?: CustomIconOptions): React.SFC<IconFontProps>;
