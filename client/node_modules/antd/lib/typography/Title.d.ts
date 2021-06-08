import * as React from 'react';
import { BlockProps } from './Base';
import { Omit } from '../_util/type';
declare const TITLE_ELE_LIST: [1, 2, 3, 4, 5];
export declare type TitleProps = Omit<BlockProps & {
    level?: typeof TITLE_ELE_LIST[number];
    onClick?: (e?: React.MouseEvent<HTMLDivElement>) => void;
}, 'strong'>;
declare const Title: React.FC<TitleProps>;
export default Title;
