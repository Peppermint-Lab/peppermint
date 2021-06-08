import type { AbstractNode, IconDefinition } from '@ant-design/icons-svg/lib/types';
export declare function warning(valid: boolean, message: string): void;
export declare function isIconDefinition(target: any): target is IconDefinition;
export declare function normalizeAttrs(attrs?: Attrs): Attrs;
export interface Attrs {
    [key: string]: string;
}
export declare function generate(node: AbstractNode, key: string, rootProps?: {
    [key: string]: any;
} | false): any;
export declare function getSecondaryColor(primaryColor: string): string;
export declare function normalizeTwoToneColors(twoToneColor: string | [string, string] | undefined): string[];
export declare const svgBaseProps: {
    width: string;
    height: string;
    fill: string;
    'aria-hidden': string;
    focusable: string;
};
export declare const iconStyles = "\n.anticon {\n  display: inline-block;\n  color: inherit;\n  font-style: normal;\n  line-height: 0;\n  text-align: center;\n  text-transform: none;\n  vertical-align: -0.125em;\n  text-rendering: optimizeLegibility;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}\n\n.anticon > * {\n  line-height: 1;\n}\n\n.anticon svg {\n  display: inline-block;\n}\n\n.anticon::before {\n  display: none;\n}\n\n.anticon .anticon-icon {\n  display: block;\n}\n\n.anticon[tabindex] {\n  cursor: pointer;\n}\n\n.anticon-spin::before,\n.anticon-spin {\n  display: inline-block;\n  -webkit-animation: loadingCircle 1s infinite linear;\n  animation: loadingCircle 1s infinite linear;\n}\n\n@-webkit-keyframes loadingCircle {\n  100% {\n    -webkit-transform: rotate(360deg);\n    transform: rotate(360deg);\n  }\n}\n\n@keyframes loadingCircle {\n  100% {\n    -webkit-transform: rotate(360deg);\n    transform: rotate(360deg);\n  }\n}\n";
export declare const useInsertStyles: (styleStr?: string) => void;
