import * as React from 'react';
/** Always debounce error to avoid [error -> null -> error] blink */
export default function useCacheErrors(errors: React.ReactNode[], changeTrigger: (visible: boolean) => void, directly: boolean): [boolean, React.ReactNode[]];
