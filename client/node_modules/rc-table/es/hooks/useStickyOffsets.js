import { useMemo } from 'react';
/**
 * Get sticky column offset width
 */

function useStickyOffsets(colWidths, columnCount, direction) {
  var stickyOffsets = useMemo(function () {
    var leftOffsets = [];
    var rightOffsets = [];
    var left = 0;
    var right = 0;

    for (var start = 0; start < columnCount; start += 1) {
      if (direction === 'rtl') {
        // Left offset
        rightOffsets[start] = right;
        right += colWidths[start] || 0; // Right offset

        var end = columnCount - start - 1;
        leftOffsets[end] = left;
        left += colWidths[end] || 0;
      } else {
        // Left offset
        leftOffsets[start] = left;
        left += colWidths[start] || 0; // Right offset

        var _end = columnCount - start - 1;

        rightOffsets[_end] = right;
        right += colWidths[_end] || 0;
      }
    }

    return {
      left: leftOffsets,
      right: rightOffsets
    };
  }, [colWidths, columnCount, direction]);
  return stickyOffsets;
}

export default useStickyOffsets;