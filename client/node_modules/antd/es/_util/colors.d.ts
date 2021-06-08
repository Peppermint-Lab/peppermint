import { ElementOf } from './type';
export declare const PresetStatusColorTypes: ["success", "processing", "error", "default", "warning"];
export declare const PresetColorTypes: ["pink", "red", "yellow", "orange", "cyan", "green", "blue", "purple", "geekblue", "magenta", "volcano", "gold", "lime"];
export declare type PresetColorType = ElementOf<typeof PresetColorTypes>;
export declare type PresetStatusColorType = ElementOf<typeof PresetStatusColorTypes>;
