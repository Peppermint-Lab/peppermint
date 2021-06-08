import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import * as React from 'react';
import { useRef, useLayoutEffect } from 'react';
import classNames from 'classnames';
import { scrollTo, waitElementReady } from '../../utils/uiUtil';
import PanelContext from '../../PanelContext';

function TimeUnitColumn(props) {
  var prefixCls = props.prefixCls,
      units = props.units,
      onSelect = props.onSelect,
      value = props.value,
      active = props.active,
      hideDisabledOptions = props.hideDisabledOptions;
  var cellPrefixCls = "".concat(prefixCls, "-cell");

  var _React$useContext = React.useContext(PanelContext),
      open = _React$useContext.open;

  var ulRef = useRef(null);
  var liRefs = useRef(new Map());
  var scrollRef = useRef(); // `useLayoutEffect` here to avoid blink by duration is 0

  useLayoutEffect(function () {
    var li = liRefs.current.get(value);

    if (li && open !== false) {
      scrollTo(ulRef.current, li.offsetTop, 120);
    }
  }, [value]);
  useLayoutEffect(function () {
    if (open) {
      var li = liRefs.current.get(value);

      if (li) {
        scrollRef.current = waitElementReady(li, function () {
          scrollTo(ulRef.current, li.offsetTop, 0);
        });
      }
    }

    return function () {
      var _scrollRef$current;

      (_scrollRef$current = scrollRef.current) === null || _scrollRef$current === void 0 ? void 0 : _scrollRef$current.call(scrollRef);
    };
  }, [open]);
  return /*#__PURE__*/React.createElement("ul", {
    className: classNames("".concat(prefixCls, "-column"), _defineProperty({}, "".concat(prefixCls, "-column-active"), active)),
    ref: ulRef,
    style: {
      position: 'relative'
    }
  }, units.map(function (unit) {
    var _classNames2;

    if (hideDisabledOptions && unit.disabled) {
      return null;
    }

    return /*#__PURE__*/React.createElement("li", {
      key: unit.value,
      ref: function ref(element) {
        liRefs.current.set(unit.value, element);
      },
      className: classNames(cellPrefixCls, (_classNames2 = {}, _defineProperty(_classNames2, "".concat(cellPrefixCls, "-disabled"), unit.disabled), _defineProperty(_classNames2, "".concat(cellPrefixCls, "-selected"), value === unit.value), _classNames2)),
      onClick: function onClick() {
        if (unit.disabled) {
          return;
        }

        onSelect(unit.value);
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "".concat(cellPrefixCls, "-inner")
    }, unit.label));
  }));
}

export default TimeUnitColumn;