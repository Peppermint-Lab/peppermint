"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCellFixedInfo = getCellFixedInfo;

function getCellFixedInfo(colStart, colEnd, columns, stickyOffsets, direction) {
  var startColumn = columns[colStart] || {};
  var endColumn = columns[colEnd] || {};
  var fixLeft;
  var fixRight;

  if (startColumn.fixed === 'left') {
    fixLeft = stickyOffsets.left[colStart];
  } else if (endColumn.fixed === 'right') {
    fixRight = stickyOffsets.right[colEnd];
  }

  var lastFixLeft = false;
  var firstFixRight = false;
  var lastFixRight = false;
  var firstFixLeft = false;
  var nextColumn = columns[colEnd + 1];
  var prevColumn = columns[colStart - 1];

  if (direction === 'rtl') {
    if (fixLeft !== undefined) {
      var prevFixLeft = prevColumn && prevColumn.fixed === 'left';
      firstFixLeft = !prevFixLeft;
    } else if (fixRight !== undefined) {
      var nextFixRight = nextColumn && nextColumn.fixed === 'right';
      lastFixRight = !nextFixRight;
    }
  } else if (fixLeft !== undefined) {
    var nextFixLeft = nextColumn && nextColumn.fixed === 'left';
    lastFixLeft = !nextFixLeft;
  } else if (fixRight !== undefined) {
    var prevFixRight = prevColumn && prevColumn.fixed === 'right';
    firstFixRight = !prevFixRight;
  }

  return {
    fixLeft: fixLeft,
    fixRight: fixRight,
    lastFixLeft: lastFixLeft,
    firstFixRight: firstFixRight,
    lastFixRight: lastFixRight,
    firstFixLeft: firstFixLeft,
    isSticky: stickyOffsets.isSticky
  };
}