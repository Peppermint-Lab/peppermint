import { useRef } from 'react';
import raf from "rc-util/es/raf";
import isFF from '../utils/isFirefox';
import useOriginScroll from './useOriginScroll';
export default function useFrameWheel(inVirtual, isScrollAtTop, isScrollAtBottom, onWheelDelta) {
  var offsetRef = useRef(0);
  var nextFrameRef = useRef(null); // Firefox patch

  var wheelValueRef = useRef(null);
  var isMouseScrollRef = useRef(false); // Scroll status sync

  var originScroll = useOriginScroll(isScrollAtTop, isScrollAtBottom);

  function onWheel(event) {
    if (!inVirtual) return;
    raf.cancel(nextFrameRef.current);
    var deltaY = event.deltaY;
    offsetRef.current += deltaY;
    wheelValueRef.current = deltaY; // Do nothing when scroll at the edge, Skip check when is in scroll

    if (originScroll(deltaY)) return; // Proxy of scroll events

    if (!isFF) {
      event.preventDefault();
    }

    nextFrameRef.current = raf(function () {
      // Patch a multiple for Firefox to fix wheel number too small
      // ref: https://github.com/ant-design/ant-design/issues/26372#issuecomment-679460266
      var patchMultiple = isMouseScrollRef.current ? 10 : 1;
      onWheelDelta(offsetRef.current * patchMultiple);
      offsetRef.current = 0;
    });
  } // A patch for firefox


  function onFireFoxScroll(event) {
    if (!inVirtual) return;
    isMouseScrollRef.current = event.detail === wheelValueRef.current;
  }

  return [onWheel, onFireFoxScroll];
}