import * as React from 'react';
import { BlockProps } from './Base';
export interface ParagraphProps extends BlockProps {
    onClick?: (e?: React.MouseEvent<HTMLDivElement>) => void;
}
declare const Paragraph: React.FC<ParagraphProps>;
export default Paragraph;
