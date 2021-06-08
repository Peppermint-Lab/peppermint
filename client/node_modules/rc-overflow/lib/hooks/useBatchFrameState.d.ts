/**
 * State generate. Return a `setState` but it will flush all state with one render to save perf.
 * This is not a realization of `unstable_batchedUpdates`.
 */
export declare function useBatchFrameState(): <T>(defaultValue: T) => [T, (value: T | ((origin: T) => T)) => void];
