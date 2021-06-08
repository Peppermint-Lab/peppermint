export declare type ScrollBehavior = 'auto' | 'smooth';
export declare type ScrollLogicalPosition = 'start' | 'center' | 'end' | 'nearest';
export declare type ScrollMode = 'always' | 'if-needed';
export declare type SkipOverflowHiddenElements = boolean;
export interface Options {
    block?: ScrollLogicalPosition;
    inline?: ScrollLogicalPosition;
    scrollMode?: ScrollMode;
    boundary?: CustomScrollBoundary;
    skipOverflowHiddenElements?: SkipOverflowHiddenElements;
}
export declare type CustomScrollBoundaryCallback = (parent: Element) => boolean;
export declare type CustomScrollBoundary = Element | CustomScrollBoundaryCallback | null;
export interface CustomScrollAction {
    el: Element;
    top: number;
    left: number;
}
export declare type CustomScrollBehaviorCallback<T> = (actions: CustomScrollAction[]) => T;
