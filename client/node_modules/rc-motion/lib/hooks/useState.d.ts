export default function useMountStatus<T>(defaultValue?: T): [T, (next: T | (() => T)) => void];
