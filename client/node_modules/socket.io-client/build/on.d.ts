import type * as Emitter from "component-emitter";
import { StrictEventEmitter } from "./typed-events";
export declare function on(obj: Emitter | StrictEventEmitter<any, any>, ev: string, fn: (err?: any) => any): VoidFunction;
