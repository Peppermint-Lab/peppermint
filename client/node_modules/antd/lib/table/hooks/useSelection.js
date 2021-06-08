"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = useSelection;
exports.SELECTION_NONE = exports.SELECTION_INVERT = exports.SELECTION_ALL = void 0;

var _toArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toArray"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var React = _interopRequireWildcard(require("react"));

var _DownOutlined = _interopRequireDefault(require("@ant-design/icons/DownOutlined"));

var _treeUtil = require("rc-tree/lib/utils/treeUtil");

var _conductUtil = require("rc-tree/lib/utils/conductUtil");

var _util = require("rc-tree/lib/util");

var _rcTable = require("rc-table");

var _useMergedState3 = _interopRequireDefault(require("rc-util/lib/hooks/useMergedState"));

var _checkbox = _interopRequireDefault(require("../../checkbox"));

var _dropdown = _interopRequireDefault(require("../../dropdown"));

var _menu = _interopRequireDefault(require("../../menu"));

var _radio = _interopRequireDefault(require("../../radio"));

var _devWarning = _interopRequireDefault(require("../../_util/devWarning"));

// TODO: warning if use ajax!!!
var SELECTION_ALL = 'SELECT_ALL';
exports.SELECTION_ALL = SELECTION_ALL;
var SELECTION_INVERT = 'SELECT_INVERT';
exports.SELECTION_INVERT = SELECTION_INVERT;
var SELECTION_NONE = 'SELECT_NONE';
exports.SELECTION_NONE = SELECTION_NONE;

function getFixedType(column) {
  return column && column.fixed;
}

function flattenData(data, childrenColumnName) {
  var list = [];
  (data || []).forEach(function (record) {
    list.push(record);

    if (record && (0, _typeof2["default"])(record) === 'object' && childrenColumnName in record) {
      list = [].concat((0, _toConsumableArray2["default"])(list), (0, _toConsumableArray2["default"])(flattenData(record[childrenColumnName], childrenColumnName)));
    }
  });
  return list;
}

function useSelection(rowSelection, config) {
  var _ref = rowSelection || {},
      preserveSelectedRowKeys = _ref.preserveSelectedRowKeys,
      selectedRowKeys = _ref.selectedRowKeys,
      defaultSelectedRowKeys = _ref.defaultSelectedRowKeys,
      getCheckboxProps = _ref.getCheckboxProps,
      onSelectionChange = _ref.onChange,
      onSelect = _ref.onSelect,
      onSelectAll = _ref.onSelectAll,
      onSelectInvert = _ref.onSelectInvert,
      onSelectNone = _ref.onSelectNone,
      onSelectMultiple = _ref.onSelectMultiple,
      selectionColWidth = _ref.columnWidth,
      selectionType = _ref.type,
      selections = _ref.selections,
      fixed = _ref.fixed,
      customizeRenderCell = _ref.renderCell,
      hideSelectAll = _ref.hideSelectAll,
      _ref$checkStrictly = _ref.checkStrictly,
      checkStrictly = _ref$checkStrictly === void 0 ? true : _ref$checkStrictly;

  var prefixCls = config.prefixCls,
      data = config.data,
      pageData = config.pageData,
      getRecordByKey = config.getRecordByKey,
      getRowKey = config.getRowKey,
      expandType = config.expandType,
      childrenColumnName = config.childrenColumnName,
      tableLocale = config.locale,
      expandIconColumnIndex = config.expandIconColumnIndex,
      getPopupContainer = config.getPopupContainer; // ======================== Caches ========================

  var preserveRecordsRef = React.useRef(new Map()); // ========================= Keys =========================

  var _useMergedState = (0, _useMergedState3["default"])(selectedRowKeys || defaultSelectedRowKeys || [], {
    value: selectedRowKeys
  }),
      _useMergedState2 = (0, _slicedToArray2["default"])(_useMergedState, 2),
      mergedSelectedKeys = _useMergedState2[0],
      setMergedSelectedKeys = _useMergedState2[1];

  var _useMemo = (0, React.useMemo)(function () {
    return checkStrictly ? {
      keyEntities: null
    } : (0, _treeUtil.convertDataToEntities)(data, {
      externalGetKey: getRowKey,
      childrenPropName: childrenColumnName
    });
  }, [data, getRowKey, checkStrictly, childrenColumnName]),
      keyEntities = _useMemo.keyEntities; // Get flatten data


  var flattedData = (0, React.useMemo)(function () {
    return flattenData(pageData, childrenColumnName);
  }, [pageData, childrenColumnName]); // Get all checkbox props

  var checkboxPropsMap = (0, React.useMemo)(function () {
    var map = new Map();
    flattedData.forEach(function (record, index) {
      var key = getRowKey(record, index);
      var checkboxProps = (getCheckboxProps ? getCheckboxProps(record) : null) || {};
      map.set(key, checkboxProps);

      if (process.env.NODE_ENV !== 'production' && ('checked' in checkboxProps || 'defaultChecked' in checkboxProps)) {
        (0, _devWarning["default"])(false, 'Table', 'Do not set `checked` or `defaultChecked` in `getCheckboxProps`. Please use `selectedRowKeys` instead.');
      }
    });
    return map;
  }, [flattedData, getRowKey, getCheckboxProps]);
  var isCheckboxDisabled = (0, React.useCallback)(function (r) {
    var _a;

    return !!((_a = checkboxPropsMap.get(getRowKey(r))) === null || _a === void 0 ? void 0 : _a.disabled);
  }, [checkboxPropsMap, getRowKey]);

  var _useMemo2 = (0, React.useMemo)(function () {
    if (checkStrictly) {
      return [mergedSelectedKeys || [], []];
    }

    var _conductCheck = (0, _conductUtil.conductCheck)(mergedSelectedKeys, true, keyEntities, isCheckboxDisabled),
        checkedKeys = _conductCheck.checkedKeys,
        halfCheckedKeys = _conductCheck.halfCheckedKeys;

    return [checkedKeys || [], halfCheckedKeys];
  }, [mergedSelectedKeys, checkStrictly, keyEntities, isCheckboxDisabled]),
      _useMemo3 = (0, _slicedToArray2["default"])(_useMemo2, 2),
      derivedSelectedKeys = _useMemo3[0],
      derivedHalfSelectedKeys = _useMemo3[1];

  var derivedSelectedKeySet = (0, React.useMemo)(function () {
    var keys = selectionType === 'radio' ? derivedSelectedKeys.slice(0, 1) : derivedSelectedKeys;
    return new Set(keys);
  }, [derivedSelectedKeys, selectionType]);
  var derivedHalfSelectedKeySet = (0, React.useMemo)(function () {
    return selectionType === 'radio' ? new Set() : new Set(derivedHalfSelectedKeys);
  }, [derivedHalfSelectedKeys, selectionType]); // Save last selected key to enable range selection

  var _useState = (0, React.useState)(null),
      _useState2 = (0, _slicedToArray2["default"])(_useState, 2),
      lastSelectedKey = _useState2[0],
      setLastSelectedKey = _useState2[1]; // Reset if rowSelection reset


  React.useEffect(function () {
    if (!rowSelection) {
      setMergedSelectedKeys([]);
    }
  }, [!!rowSelection]);
  var setSelectedKeys = (0, React.useCallback)(function (keys) {
    var availableKeys;
    var records;

    if (preserveSelectedRowKeys) {
      // Keep key if mark as preserveSelectedRowKeys
      var newCache = new Map();
      availableKeys = keys;
      records = keys.map(function (key) {
        var record = getRecordByKey(key);

        if (!record && preserveRecordsRef.current.has(key)) {
          record = preserveRecordsRef.current.get(key);
        }

        newCache.set(key, record);
        return record;
      }); // Refresh to new cache

      preserveRecordsRef.current = newCache;
    } else {
      // Filter key which not exist in the `dataSource`
      availableKeys = [];
      records = [];
      keys.forEach(function (key) {
        var record = getRecordByKey(key);

        if (record !== undefined) {
          availableKeys.push(key);
          records.push(record);
        }
      });
    }

    setMergedSelectedKeys(availableKeys);
    onSelectionChange === null || onSelectionChange === void 0 ? void 0 : onSelectionChange(availableKeys, records);
  }, [setMergedSelectedKeys, getRecordByKey, onSelectionChange, preserveSelectedRowKeys]); // ====================== Selections ======================
  // Trigger single `onSelect` event

  var triggerSingleSelection = (0, React.useCallback)(function (key, selected, keys, event) {
    if (onSelect) {
      var rows = keys.map(function (k) {
        return getRecordByKey(k);
      });
      onSelect(getRecordByKey(key), selected, rows, event);
    }

    setSelectedKeys(keys);
  }, [onSelect, getRecordByKey, setSelectedKeys]);
  var mergedSelections = (0, React.useMemo)(function () {
    if (!selections || hideSelectAll) {
      return null;
    }

    var selectionList = selections === true ? [SELECTION_ALL, SELECTION_INVERT, SELECTION_NONE] : selections;
    return selectionList.map(function (selection) {
      if (selection === SELECTION_ALL) {
        return {
          key: 'all',
          text: tableLocale.selectionAll,
          onSelect: function onSelect() {
            setSelectedKeys(data.map(function (record, index) {
              return getRowKey(record, index);
            }));
          }
        };
      }

      if (selection === SELECTION_INVERT) {
        return {
          key: 'invert',
          text: tableLocale.selectInvert,
          onSelect: function onSelect() {
            var keySet = new Set(derivedSelectedKeySet);
            pageData.forEach(function (record, index) {
              var key = getRowKey(record, index);

              if (keySet.has(key)) {
                keySet["delete"](key);
              } else {
                keySet.add(key);
              }
            });
            var keys = Array.from(keySet);

            if (onSelectInvert) {
              (0, _devWarning["default"])(false, 'Table', '`onSelectInvert` will be removed in future. Please use `onChange` instead.');
              onSelectInvert(keys);
            }

            setSelectedKeys(keys);
          }
        };
      }

      if (selection === SELECTION_NONE) {
        return {
          key: 'none',
          text: tableLocale.selectNone,
          onSelect: function onSelect() {
            onSelectNone === null || onSelectNone === void 0 ? void 0 : onSelectNone();
            setSelectedKeys([]);
          }
        };
      }

      return selection;
    });
  }, [selections, derivedSelectedKeySet, pageData, getRowKey, onSelectInvert, setSelectedKeys]); // ======================= Columns ========================

  var transformColumns = (0, React.useCallback)(function (columns) {
    if (!rowSelection) {
      return columns;
    } // Support selection


    var keySet = new Set(derivedSelectedKeySet); // Record key only need check with enabled

    var recordKeys = flattedData.map(getRowKey).filter(function (key) {
      return !checkboxPropsMap.get(key).disabled;
    });
    var checkedCurrentAll = recordKeys.every(function (key) {
      return keySet.has(key);
    });
    var checkedCurrentSome = recordKeys.some(function (key) {
      return keySet.has(key);
    });

    var onSelectAllChange = function onSelectAllChange() {
      var changeKeys = [];

      if (checkedCurrentAll) {
        recordKeys.forEach(function (key) {
          keySet["delete"](key);
          changeKeys.push(key);
        });
      } else {
        recordKeys.forEach(function (key) {
          if (!keySet.has(key)) {
            keySet.add(key);
            changeKeys.push(key);
          }
        });
      }

      var keys = Array.from(keySet);
      onSelectAll === null || onSelectAll === void 0 ? void 0 : onSelectAll(!checkedCurrentAll, keys.map(function (k) {
        return getRecordByKey(k);
      }), changeKeys.map(function (k) {
        return getRecordByKey(k);
      }));
      setSelectedKeys(keys);
    }; // ===================== Render =====================
    // Title Cell


    var title;

    if (selectionType !== 'radio') {
      var customizeSelections;

      if (mergedSelections) {
        var menu = /*#__PURE__*/React.createElement(_menu["default"], {
          getPopupContainer: getPopupContainer
        }, mergedSelections.map(function (selection, index) {
          var key = selection.key,
              text = selection.text,
              onSelectionClick = selection.onSelect;
          return /*#__PURE__*/React.createElement(_menu["default"].Item, {
            key: key || index,
            onClick: function onClick() {
              onSelectionClick === null || onSelectionClick === void 0 ? void 0 : onSelectionClick(recordKeys);
            }
          }, text);
        }));
        customizeSelections = /*#__PURE__*/React.createElement("div", {
          className: "".concat(prefixCls, "-selection-extra")
        }, /*#__PURE__*/React.createElement(_dropdown["default"], {
          overlay: menu,
          getPopupContainer: getPopupContainer
        }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement(_DownOutlined["default"], null))));
      }

      var allDisabled = flattedData.every(function (record, index) {
        var key = getRowKey(record, index);
        var checkboxProps = checkboxPropsMap.get(key) || {};
        return checkboxProps.disabled;
      });
      title = !hideSelectAll && /*#__PURE__*/React.createElement("div", {
        className: "".concat(prefixCls, "-selection")
      }, /*#__PURE__*/React.createElement(_checkbox["default"], {
        checked: !allDisabled && !!flattedData.length && checkedCurrentAll,
        indeterminate: !checkedCurrentAll && checkedCurrentSome,
        onChange: onSelectAllChange,
        disabled: flattedData.length === 0 || allDisabled,
        skipGroup: true
      }), customizeSelections);
    } // Body Cell


    var renderCell;

    if (selectionType === 'radio') {
      renderCell = function renderCell(_, record, index) {
        var key = getRowKey(record, index);
        var checked = keySet.has(key);
        return {
          node: /*#__PURE__*/React.createElement(_radio["default"], (0, _extends2["default"])({}, checkboxPropsMap.get(key), {
            checked: checked,
            onClick: function onClick(e) {
              return e.stopPropagation();
            },
            onChange: function onChange(event) {
              if (!keySet.has(key)) {
                triggerSingleSelection(key, true, [key], event.nativeEvent);
              }
            }
          })),
          checked: checked
        };
      };
    } else {
      renderCell = function renderCell(_, record, index) {
        var _a;

        var key = getRowKey(record, index);
        var checked = keySet.has(key);
        var indeterminate = derivedHalfSelectedKeySet.has(key);
        var checkboxProps = checkboxPropsMap.get(key);
        var mergedIndeterminate;

        if (expandType === 'nest') {
          mergedIndeterminate = indeterminate;
          (0, _devWarning["default"])(typeof (checkboxProps === null || checkboxProps === void 0 ? void 0 : checkboxProps.indeterminate) !== 'boolean', 'Table', 'set `indeterminate` using `rowSelection.getCheckboxProps` is not allowed with tree structured dataSource.');
        } else {
          mergedIndeterminate = (_a = checkboxProps === null || checkboxProps === void 0 ? void 0 : checkboxProps.indeterminate) !== null && _a !== void 0 ? _a : indeterminate;
        } // Record checked


        return {
          node: /*#__PURE__*/React.createElement(_checkbox["default"], (0, _extends2["default"])({}, checkboxProps, {
            indeterminate: mergedIndeterminate,
            checked: checked,
            skipGroup: true,
            onClick: function onClick(e) {
              return e.stopPropagation();
            },
            onChange: function onChange(_ref2) {
              var nativeEvent = _ref2.nativeEvent;
              var shiftKey = nativeEvent.shiftKey;
              var startIndex = -1;
              var endIndex = -1; // Get range of this

              if (shiftKey && checkStrictly) {
                var pointKeys = new Set([lastSelectedKey, key]);
                recordKeys.some(function (recordKey, recordIndex) {
                  if (pointKeys.has(recordKey)) {
                    if (startIndex === -1) {
                      startIndex = recordIndex;
                    } else {
                      endIndex = recordIndex;
                      return true;
                    }
                  }

                  return false;
                });
              }

              if (endIndex !== -1 && startIndex !== endIndex && checkStrictly) {
                // Batch update selections
                var rangeKeys = recordKeys.slice(startIndex, endIndex + 1);
                var changedKeys = [];

                if (checked) {
                  rangeKeys.forEach(function (recordKey) {
                    if (keySet.has(recordKey)) {
                      changedKeys.push(recordKey);
                      keySet["delete"](recordKey);
                    }
                  });
                } else {
                  rangeKeys.forEach(function (recordKey) {
                    if (!keySet.has(recordKey)) {
                      changedKeys.push(recordKey);
                      keySet.add(recordKey);
                    }
                  });
                }

                var keys = Array.from(keySet);
                onSelectMultiple === null || onSelectMultiple === void 0 ? void 0 : onSelectMultiple(!checked, keys.map(function (recordKey) {
                  return getRecordByKey(recordKey);
                }), changedKeys.map(function (recordKey) {
                  return getRecordByKey(recordKey);
                }));
                setSelectedKeys(keys);
              } else {
                // Single record selected
                var originCheckedKeys = derivedSelectedKeys;

                if (checkStrictly) {
                  var checkedKeys = checked ? (0, _util.arrDel)(originCheckedKeys, key) : (0, _util.arrAdd)(originCheckedKeys, key);
                  triggerSingleSelection(key, !checked, checkedKeys, nativeEvent);
                } else {
                  // Always fill first
                  var result = (0, _conductUtil.conductCheck)([].concat((0, _toConsumableArray2["default"])(originCheckedKeys), [key]), true, keyEntities, isCheckboxDisabled);
                  var _checkedKeys = result.checkedKeys,
                      halfCheckedKeys = result.halfCheckedKeys;
                  var nextCheckedKeys = _checkedKeys; // If remove, we do it again to correction

                  if (checked) {
                    var tempKeySet = new Set(_checkedKeys);
                    tempKeySet["delete"](key);
                    nextCheckedKeys = (0, _conductUtil.conductCheck)(Array.from(tempKeySet), {
                      checked: false,
                      halfCheckedKeys: halfCheckedKeys
                    }, keyEntities, isCheckboxDisabled).checkedKeys;
                  }

                  triggerSingleSelection(key, !checked, nextCheckedKeys, nativeEvent);
                }
              }

              setLastSelectedKey(key);
            }
          })),
          checked: checked
        };
      };
    }

    var renderSelectionCell = function renderSelectionCell(_, record, index) {
      var _renderCell = renderCell(_, record, index),
          node = _renderCell.node,
          checked = _renderCell.checked;

      if (customizeRenderCell) {
        return customizeRenderCell(checked, record, index, node);
      }

      return node;
    }; // Columns


    var selectionColumn = (0, _defineProperty2["default"])({
      width: selectionColWidth,
      className: "".concat(prefixCls, "-selection-column"),
      title: rowSelection.columnTitle || title,
      render: renderSelectionCell
    }, _rcTable.INTERNAL_COL_DEFINE, {
      className: "".concat(prefixCls, "-selection-col")
    });

    if (expandType === 'row' && columns.length && !expandIconColumnIndex) {
      var _columns = (0, _toArray2["default"])(columns),
          expandColumn = _columns[0],
          restColumns = _columns.slice(1);

      var selectionFixed = fixed || getFixedType(restColumns[0]);

      if (selectionFixed) {
        expandColumn.fixed = selectionFixed;
      }

      return [expandColumn, (0, _extends2["default"])((0, _extends2["default"])({}, selectionColumn), {
        fixed: selectionFixed
      })].concat((0, _toConsumableArray2["default"])(restColumns));
    }

    return [(0, _extends2["default"])((0, _extends2["default"])({}, selectionColumn), {
      fixed: fixed || getFixedType(columns[0])
    })].concat((0, _toConsumableArray2["default"])(columns));
  }, [getRowKey, flattedData, rowSelection, derivedSelectedKeys, derivedSelectedKeySet, derivedHalfSelectedKeySet, selectionColWidth, mergedSelections, expandType, lastSelectedKey, checkboxPropsMap, onSelectMultiple, triggerSingleSelection, isCheckboxDisabled]);
  return [transformColumns, derivedSelectedKeySet];
}