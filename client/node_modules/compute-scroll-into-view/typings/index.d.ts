declare type ScrollLogicalPosition = 'start' | 'center' | 'end' | 'nearest';
declare type ScrollMode = 'always' | 'if-needed';
declare type SkipOverflowHiddenElements = boolean;
interface Options {
    block?: ScrollLogicalPosition;
    inline?: ScrollLogicalPosition;
    scrollMode?: ScrollMode;
    boundary?: CustomScrollBoundary;
    skipOverflowHiddenElements?: SkipOverflowHiddenElements;
}
declare type CustomScrollBoundaryCallback = (parent: Element) => boolean;
declare type CustomScrollBoundary = Element | CustomScrollBoundaryCallback | null;
interface CustomScrollAction {
    el: Element;
    top: number;
    left: number;
}
declare const _default: (target: Element, options: Options) => CustomScrollAction[];
export default _default;
