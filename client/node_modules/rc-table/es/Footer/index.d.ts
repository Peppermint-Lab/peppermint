import * as React from 'react';
import Cell from './Cell';
import Row from './Row';
export interface FooterProps {
    children: React.ReactNode;
}
declare function Footer({ children }: FooterProps): JSX.Element;
export default Footer;
export declare const FooterComponents: {
    Cell: typeof Cell;
    Row: typeof Row;
};
