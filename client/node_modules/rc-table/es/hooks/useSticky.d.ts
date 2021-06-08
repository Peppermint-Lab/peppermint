import { TableSticky } from '../interface';
/** Sticky header hooks */
export default function useSticky(sticky: boolean | TableSticky, prefixCls: string): {
    isSticky: boolean;
    offsetHeader: number;
    offsetScroll: number;
    stickyClassName: string;
    container: Window | HTMLElement;
};
