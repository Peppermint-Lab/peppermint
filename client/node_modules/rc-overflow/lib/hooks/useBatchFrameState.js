"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useBatchFrameState = useBatchFrameState;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = require("react");

var _raf = _interopRequireDefault(require("rc-util/lib/raf"));

/**
 * State generate. Return a `setState` but it will flush all state with one render to save perf.
 * This is not a realization of `unstable_batchedUpdates`.
 */
function useBatchFrameState() {
  var _useState = (0, _react.useState)({}),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      forceUpdate = _useState2[1];

  var statesRef = (0, _react.useRef)([]);
  var destroyRef = (0, _react.useRef)(false);
  var walkingIndex = 0;
  var beforeFrameId = 0;
  (0, _react.useEffect)(function () {
    return function () {
      destroyRef.current = true;
    };
  }, []);

  function createState(defaultValue) {
    var myIndex = walkingIndex;
    walkingIndex += 1; // Fill value if not exist yet

    if (statesRef.current.length < myIndex + 1) {
      statesRef.current[myIndex] = defaultValue;
    } // Return filled as `setState`


    var value = statesRef.current[myIndex];

    function setValue(val) {
      statesRef.current[myIndex] = typeof val === 'function' ? val(statesRef.current[myIndex]) : val;

      _raf.default.cancel(beforeFrameId); // Flush with batch


      beforeFrameId = (0, _raf.default)(function () {
        if (!destroyRef.current) {
          forceUpdate({});
        }
      });
    }

    return [value, setValue];
  }

  return createState;
}