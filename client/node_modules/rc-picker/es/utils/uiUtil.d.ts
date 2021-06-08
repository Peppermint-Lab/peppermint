/// <reference types="react" />
import type { GenerateConfig } from '../generate';
import type { CustomFormat, PanelMode, PickerMode } from '../interface';
/** Trigger when element is visible in view */
export declare function waitElementReady(element: HTMLElement, callback: () => void): () => void;
export declare function scrollTo(element: HTMLElement, to: number, duration: number): void;
export declare type KeyboardConfig = {
    onLeftRight?: ((diff: number) => void) | null;
    onCtrlLeftRight?: ((diff: number) => void) | null;
    onUpDown?: ((diff: number) => void) | null;
    onPageUpDown?: ((diff: number) => void) | null;
    onEnter?: (() => void) | null;
};
export declare function createKeyDownHandler(event: React.KeyboardEvent<HTMLElement>, { onLeftRight, onCtrlLeftRight, onUpDown, onPageUpDown, onEnter }: KeyboardConfig): boolean;
export declare function getDefaultFormat<DateType>(format: string | CustomFormat<DateType> | (string | CustomFormat<DateType>)[] | undefined, picker: PickerMode | undefined, showTime: boolean | object | undefined, use12Hours: boolean | undefined): string | CustomFormat<DateType> | (string | CustomFormat<DateType>)[];
export declare function getInputSize<DateType>(picker: PickerMode | undefined, format: string | CustomFormat<DateType>, generateConfig: GenerateConfig<DateType>): number;
declare type ClickEventHandler = (event: MouseEvent) => void;
export declare function addGlobalMouseDownEvent(callback: ClickEventHandler): () => void;
export declare function getTargetFromEvent(e: Event): HTMLElement;
export declare const PickerModeMap: Record<PickerMode, ((next: PanelMode) => PanelMode) | null>;
export declare function elementsContains(elements: (HTMLElement | undefined | null)[], target: HTMLElement): boolean;
export {};
