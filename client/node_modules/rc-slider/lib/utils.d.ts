/// <reference types="react" />
export declare function isEventFromHandle(e: {
    target: HTMLElement;
}, handles: Record<number, React.ReactElement>): boolean;
export declare function isValueOutOfRange(value: number, { min, max }: {
    min?: number;
    max?: number;
}): boolean;
export declare function isNotTouchEvent(e: React.TouchEvent): boolean;
export declare function getClosestPoint(val: number, { marks, step, min, max }: {
    marks: any;
    step: any;
    min: any;
    max: any;
}): number;
export declare function getPrecision(step: number): number;
export declare function getMousePosition(vertical: boolean, e: React.MouseEvent): number;
export declare function getTouchPosition(vertical: boolean, e: React.TouchEvent): number;
export declare function getHandleCenterPosition(vertical: boolean, handle: HTMLElement): number;
export declare function ensureValueInRange(val: number, { max, min }: {
    max?: number;
    min?: number;
}): number;
export declare function ensureValuePrecision(val: number, props: any): number;
export declare function pauseEvent(e: React.SyntheticEvent): void;
export declare function calculateNextValue(func: any, value: any, props: any): any;
export declare function getKeyboardValueMutator(e: React.KeyboardEvent, vertical: boolean, reverse: boolean): (value: any, props: any) => any;
