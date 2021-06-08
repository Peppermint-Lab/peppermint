import * as React from 'react';
import TableContext from '../context/TableContext';
import Cell from './Cell';
import Row from './Row';

function Footer(_ref) {
  var children = _ref.children;

  var _React$useContext = React.useContext(TableContext),
      prefixCls = _React$useContext.prefixCls;

  return /*#__PURE__*/React.createElement("tfoot", {
    className: "".concat(prefixCls, "-summary")
  }, children);
}

export default Footer;
export var FooterComponents = {
  Cell: Cell,
  Row: Row
};