"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useFrameWheel;

var _react = require("react");

var _raf = _interopRequireDefault(require("rc-util/lib/raf"));

var _isFirefox = _interopRequireDefault(require("../utils/isFirefox"));

var _useOriginScroll = _interopRequireDefault(require("./useOriginScroll"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function useFrameWheel(inVirtual, isScrollAtTop, isScrollAtBottom, onWheelDelta) {
  var offsetRef = (0, _react.useRef)(0);
  var nextFrameRef = (0, _react.useRef)(null); // Firefox patch

  var wheelValueRef = (0, _react.useRef)(null);
  var isMouseScrollRef = (0, _react.useRef)(false); // Scroll status sync

  var originScroll = (0, _useOriginScroll.default)(isScrollAtTop, isScrollAtBottom);

  function onWheel(event) {
    if (!inVirtual) return;

    _raf.default.cancel(nextFrameRef.current);

    var deltaY = event.deltaY;
    offsetRef.current += deltaY;
    wheelValueRef.current = deltaY; // Do nothing when scroll at the edge, Skip check when is in scroll

    if (originScroll(deltaY)) return; // Proxy of scroll events

    if (!_isFirefox.default) {
      event.preventDefault();
    }

    nextFrameRef.current = (0, _raf.default)(function () {
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