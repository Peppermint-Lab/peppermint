import _typeof from "@babel/runtime/helpers/esm/typeof";
import * as React from 'react';
import classNames from 'classnames';
import LoadingOutlined from "@ant-design/icons/es/icons/LoadingOutlined";
import FileOutlined from "@ant-design/icons/es/icons/FileOutlined";
import MinusSquareOutlined from "@ant-design/icons/es/icons/MinusSquareOutlined";
import PlusSquareOutlined from "@ant-design/icons/es/icons/PlusSquareOutlined";
import CaretDownFilled from "@ant-design/icons/es/icons/CaretDownFilled";
import { isValidElement, cloneElement } from '../../_util/reactNode';
export default function renderSwitcherIcon(prefixCls, switcherIcon, showLine, _ref) {
  var isLeaf = _ref.isLeaf,
      expanded = _ref.expanded,
      loading = _ref.loading;

  if (loading) {
    return /*#__PURE__*/React.createElement(LoadingOutlined, {
      className: "".concat(prefixCls, "-switcher-loading-icon")
    });
  }

  var showLeafIcon;

  if (showLine && _typeof(showLine) === 'object') {
    showLeafIcon = showLine.showLeafIcon;
  }

  if (isLeaf) {
    if (showLine) {
      if (_typeof(showLine) === 'object' && !showLeafIcon) {
        return /*#__PURE__*/React.createElement("span", {
          className: "".concat(prefixCls, "-switcher-leaf-line")
        });
      }

      return /*#__PURE__*/React.createElement(FileOutlined, {
        className: "".concat(prefixCls, "-switcher-line-icon")
      });
    }

    return null;
  }

  var switcherCls = "".concat(prefixCls, "-switcher-icon");

  if (isValidElement(switcherIcon)) {
    return cloneElement(switcherIcon, {
      className: classNames(switcherIcon.props.className || '', switcherCls)
    });
  }

  if (switcherIcon) {
    return switcherIcon;
  }

  if (showLine) {
    return expanded ? /*#__PURE__*/React.createElement(MinusSquareOutlined, {
      className: "".concat(prefixCls, "-switcher-line-icon")
    }) : /*#__PURE__*/React.createElement(PlusSquareOutlined, {
      className: "".concat(prefixCls, "-switcher-line-icon")
    });
  }

  return /*#__PURE__*/React.createElement(CaretDownFilled, {
    className: switcherCls
  });
}