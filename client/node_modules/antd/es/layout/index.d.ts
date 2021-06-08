/// <reference types="react" />
import { BasicProps, Content, Footer, Header } from './layout';
import Sider from './Sider';
export { BasicProps as LayoutProps } from './layout';
export { SiderProps } from './Sider';
interface LayoutType extends React.FC<BasicProps> {
    Header: typeof Header;
    Footer: typeof Footer;
    Content: typeof Content;
    Sider: typeof Sider;
}
declare const Layout: LayoutType;
export default Layout;
