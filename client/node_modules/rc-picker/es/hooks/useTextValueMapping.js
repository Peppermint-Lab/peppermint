import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import * as React from 'react';
export default function useTextValueMapping(_ref) {
  var valueTexts = _ref.valueTexts,
      onTextChange = _ref.onTextChange;

  var _React$useState = React.useState(''),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      text = _React$useState2[0],
      setInnerText = _React$useState2[1];

  var valueTextsRef = React.useRef([]);
  valueTextsRef.current = valueTexts;

  function triggerTextChange(value) {
    setInnerText(value);
    onTextChange(value);
  }

  function resetText() {
    setInnerText(valueTextsRef.current[0]);
  }

  React.useEffect(function () {
    if (valueTexts.every(function (valText) {
      return valText !== text;
    })) {
      resetText();
    }
  }, [valueTexts.join('||')]);
  return [text, triggerTextChange, resetText];
}