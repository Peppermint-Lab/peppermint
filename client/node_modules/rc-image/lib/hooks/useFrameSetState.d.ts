declare type SetActionType<T> = Partial<T> | ((state: T) => Partial<T>);
export default function useFrameSetState<T extends object>(initial: T): [T, (newState: SetActionType<T>) => void];
export {};
