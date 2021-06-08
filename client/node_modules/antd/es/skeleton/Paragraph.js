import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
import * as React from 'react';
import classNames from 'classnames';

var Paragraph = function Paragraph(props) {
  var getWidth = function getWidth(index) {
    var width = props.width,
        _props$rows = props.rows,
        rows = _props$rows === void 0 ? 2 : _props$rows;

    if (Array.isArray(width)) {
      return width[index];
    } // last paragraph


    if (rows - 1 === index) {
      return width;
    }

    return undefined;
  };

  var prefixCls = props.prefixCls,
      className = props.className,
      style = props.style,
      rows = props.rows;

  var rowList = _toConsumableArray(Array(rows)).map(function (_, index) {
    return (
      /*#__PURE__*/
      // eslint-disable-next-line react/no-array-index-key
      React.createElement("li", {
        key: index,
        style: {
          width: getWidth(index)
        }
      })
    );
  });

  return /*#__PURE__*/React.createElement("ul", {
    className: classNames(prefixCls, className),
    style: style
  }, rowList);
};

export default Paragraph;