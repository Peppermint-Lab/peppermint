interface FireFoxDOMMouseScrollEvent {
    detail: number;
    preventDefault: Function;
}
export default function useFrameWheel(inVirtual: boolean, isScrollAtTop: boolean, isScrollAtBottom: boolean, onWheelDelta: (offset: number) => void): [(e: WheelEvent) => void, (e: FireFoxDOMMouseScrollEvent) => void];
export {};
