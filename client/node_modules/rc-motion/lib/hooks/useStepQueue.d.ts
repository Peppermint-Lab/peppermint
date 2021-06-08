import { StepStatus, MotionStatus } from '../interface';
/** Skip current step */
export declare const SkipStep: false;
/** Current step should be update in */
export declare const DoStep: true;
export declare function isActive(step: StepStatus): boolean;
declare const _default: (status: MotionStatus, callback: (step: StepStatus) => Promise<void> | void | typeof SkipStep | typeof DoStep) => [() => void, StepStatus];
export default _default;
