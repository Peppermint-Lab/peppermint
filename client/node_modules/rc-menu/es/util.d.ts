import * as React from 'react';
export declare function noop(): void;
export declare function getKeyFromChildrenIndex(child: React.ReactElement, menuEventKey: React.Key, index: number): React.Key;
export declare function getMenuIdFromSubMenuEventKey(eventKey: string): React.Key;
export declare function loopMenuItem(children: React.ReactNode, cb: (node: React.ReactElement, index: number) => void): void;
export declare function loopMenuItemRecursively(children: React.ReactNode, keys: string[], ret: {
    find: boolean;
}): void;
export declare const menuAllProps: string[];
export declare const getWidth: (elem: HTMLElement, includeMargin?: boolean) => number;
export declare const setStyle: (elem: HTMLElement, styleProperty: keyof React.CSSProperties, value: string | number) => void;
export declare const isMobileDevice: () => boolean;
