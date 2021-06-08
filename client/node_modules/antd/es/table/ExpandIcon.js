import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import * as React from 'react';
import classNames from 'classnames';

function renderExpandIcon(locale) {
  return function expandIcon(_ref) {
    var _classNames;

    var prefixCls = _ref.prefixCls,
        onExpand = _ref.onExpand,
        record = _ref.record,
        expanded = _ref.expanded,
        expandable = _ref.expandable;
    var iconPrefix = "".concat(prefixCls, "-row-expand-icon");
    return /*#__PURE__*/React.createElement("button", {
      type: "button",
      onClick: function onClick(e) {
        onExpand(record, e);
        e.stopPropagation();
      },
      className: classNames(iconPrefix, (_classNames = {}, _defineProperty(_classNames, "".concat(iconPrefix, "-spaced"), !expandable), _defineProperty(_classNames, "".concat(iconPrefix, "-expanded"), expandable && expanded), _defineProperty(_classNames, "".concat(iconPrefix, "-collapsed"), expandable && !expanded), _classNames)),
      "aria-label": expanded ? locale.collapse : locale.expand
    });
  };
}

export default renderExpandIcon;