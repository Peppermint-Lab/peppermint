import * as React from 'react';
interface Option {
    rows: number;
    suffix?: string;
}
declare const _default: (originEle: HTMLElement, option: Option, content: React.ReactNode, fixedContent: React.ReactNode[], ellipsisStr: string) => {
    content: React.ReactNode;
    text: string;
    ellipsis: boolean;
};
export default _default;
