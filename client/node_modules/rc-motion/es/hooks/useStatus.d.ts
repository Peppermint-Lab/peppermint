import * as React from 'react';
import { MotionStatus, StepStatus } from '../interface';
import { CSSMotionProps } from '../CSSMotion';
export default function useStatus(supportMotion: boolean, visible: boolean, getElement: () => HTMLElement, { motionEnter, motionAppear, motionLeave, motionDeadline, motionLeaveImmediately, onAppearPrepare, onEnterPrepare, onLeavePrepare, onAppearStart, onEnterStart, onLeaveStart, onAppearActive, onEnterActive, onLeaveActive, onAppearEnd, onEnterEnd, onLeaveEnd, onVisibleChanged, }: CSSMotionProps): [MotionStatus, StepStatus, React.CSSProperties, boolean];
