declare type UseSyncStateProps<T> = [() => T, (newValue: T) => void];
export default function useSyncState<T>(initialValue: T): UseSyncStateProps<T>;
export {};
