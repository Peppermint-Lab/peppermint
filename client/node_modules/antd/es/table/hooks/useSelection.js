import _toArray from "@babel/runtime/helpers/esm/toArray";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _extends from "@babel/runtime/helpers/esm/extends";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
import _typeof from "@babel/runtime/helpers/esm/typeof";
import * as React from 'react';
import { useState, useCallback, useMemo } from 'react';
import DownOutlined from "@ant-design/icons/es/icons/DownOutlined";
import { convertDataToEntities } from "rc-tree/es/utils/treeUtil";
import { conductCheck } from "rc-tree/es/utils/conductUtil";
import { arrAdd, arrDel } from "rc-tree/es/util";
import { INTERNAL_COL_DEFINE } from 'rc-table';
import useMergedState from "rc-util/es/hooks/useMergedState";
import Checkbox from '../../checkbox';
import Dropdown from '../../dropdown';
import Menu from '../../menu';
import Radio from '../../radio';
import devWarning from '../../_util/devWarning'; // TODO: warning if use ajax!!!

export var SELECTION_ALL = 'SELECT_ALL';
export var SELECTION_INVERT = 'SELECT_INVERT';
export var SELECTION_NONE = 'SELECT_NONE';

function getFixedType(column) {
  return column && column.fixed;
}

function flattenData(data, childrenColumnName) {
  var list = [];
  (data || []).forEach(function (record) {
    list.push(record);

    if (record && _typeof(record) === 'object' && childrenColumnName in record) {
      list = [].concat(_toConsumableArray(list), _toConsumableArray(flattenData(record[childrenColumnName], childrenColumnName)));
    }
  });
  return list;
}

export default function useSelection(rowSelection, config) {
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

  var _useMergedState = useMergedState(selectedRowKeys || defaultSelectedRowKeys || [], {
    value: selectedRowKeys
  }),
      _useMergedState2 = _slicedToArray(_useMergedState, 2),
      mergedSelectedKeys = _useMergedState2[0],
      setMergedSelectedKeys = _useMergedState2[1];

  var _useMemo = useMemo(function () {
    return checkStrictly ? {
      keyEntities: null
    } : convertDataToEntities(data, {
      externalGetKey: getRowKey,
      childrenPropName: childrenColumnName
    });
  }, [data, getRowKey, checkStrictly, childrenColumnName]),
      keyEntities = _useMemo.keyEntities; // Get flatten data


  var flattedData = useMemo(function () {
    return flattenData(pageData, childrenColumnName);
  }, [pageData, childrenColumnName]); // Get all checkbox props

  var checkboxPropsMap = useMemo(function () {
    var map = new Map();
    flattedData.forEach(function (record, index) {
      var key = getRowKey(record, index);
      var checkboxProps = (getCheckboxProps ? getCheckboxProps(record) : null) || {};
      map.set(key, checkboxProps);

      if (process.env.NODE_ENV !== 'production' && ('checked' in checkboxProps || 'defaultChecked' in checkboxProps)) {
        devWarning(false, 'Table', 'Do not set `checked` or `defaultChecked` in `getCheckboxProps`. Please use `selectedRowKeys` instead.');
      }
    });
    return map;
  }, [flattedData, getRowKey, getCheckboxProps]);
  var isCheckboxDisabled = useCallback(function (r) {
    var _a;

    return !!((_a = checkboxPropsMap.get(getRowKey(r))) === null || _a === void 0 ? void 0 : _a.disabled);
  }, [checkboxPropsMap, getRowKey]);

  var _useMemo2 = useMemo(function () {
    if (checkStrictly) {
      return [mergedSelectedKeys || [], []];
    }

    var _conductCheck = conductCheck(mergedSelectedKeys, true, keyEntities, isCheckboxDisabled),
        checkedKeys = _conductCheck.checkedKeys,
        halfCheckedKeys = _conductCheck.halfCheckedKeys;

    return [checkedKeys || [], halfCheckedKeys];
  }, [mergedSelectedKeys, checkStrictly, keyEntities, isCheckboxDisabled]),
      _useMemo3 = _slicedToArray(_useMemo2, 2),
      derivedSelectedKeys = _useMemo3[0],
      derivedHalfSelectedKeys = _useMemo3[1];

  var derivedSelectedKeySet = useMemo(function () {
    var keys = selectionType === 'radio' ? derivedSelectedKeys.slice(0, 1) : derivedSelectedKeys;
    return new Set(keys);
  }, [derivedSelectedKeys, selectionType]);
  var derivedHalfSelectedKeySet = useMemo(function () {
    return selectionType === 'radio' ? new Set() : new Set(derivedHalfSelectedKeys);
  }, [derivedHalfSelectedKeys, selectionType]); // Save last selected key to enable range selection

  var _useState = useState(null),
      _useState2 = _slicedToArray(_useState, 2),
      lastSelectedKey = _useState2[0],
      setLastSelectedKey = _useState2[1]; // Reset if rowSelection reset


  React.useEffect(function () {
    if (!rowSelection) {
      setMergedSelectedKeys([]);
    }
  }, [!!rowSelection]);
  var setSelectedKeys = useCallback(function (keys) {
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

  var triggerSingleSelection = useCallback(function (key, selected, keys, event) {
    if (onSelect) {
      var rows = keys.map(function (k) {
        return getRecordByKey(k);
      });
      onSelect(getRecordByKey(key), selected, rows, event);
    }

    setSelectedKeys(keys);
  }, [onSelect, getRecordByKey, setSelectedKeys]);
  var mergedSelections = useMemo(function () {
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
              devWarning(false, 'Table', '`onSelectInvert` will be removed in future. Please use `onChange` instead.');
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

  var transformColumns = useCallback(function (columns) {
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
        var menu = /*#__PURE__*/React.createElement(Menu, {
          getPopupContainer: getPopupContainer
        }, mergedSelections.map(function (selection, index) {
          var key = selection.key,
              text = selection.text,
              onSelectionClick = selection.onSelect;
          return /*#__PURE__*/React.createElement(Menu.Item, {
            key: key || index,
            onClick: function onClick() {
              onSelectionClick === null || onSelectionClick === void 0 ? void 0 : onSelectionClick(recordKeys);
            }
          }, text);
        }));
        customizeSelections = /*#__PURE__*/React.createElement("div", {
          className: "".concat(prefixCls, "-selection-extra")
        }, /*#__PURE__*/React.createElement(Dropdown, {
          overlay: menu,
          getPopupContainer: getPopupContainer
        }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement(DownOutlined, null))));
      }

      var allDisabled = flattedData.every(function (record, index) {
        var key = getRowKey(record, index);
        var checkboxProps = checkboxPropsMap.get(key) || {};
        return checkboxProps.disabled;
      });
      title = !hideSelectAll && /*#__PURE__*/React.createElement("div", {
        className: "".concat(prefixCls, "-selection")
      }, /*#__PURE__*/React.createElement(Checkbox, {
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
          node: /*#__PURE__*/React.createElement(Radio, _extends({}, checkboxPropsMap.get(key), {
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
          devWarning(typeof (checkboxProps === null || checkboxProps === void 0 ? void 0 : checkboxProps.indeterminate) !== 'boolean', 'Table', 'set `indeterminate` using `rowSelection.getCheckboxProps` is not allowed with tree structured dataSource.');
        } else {
          mergedIndeterminate = (_a = checkboxProps === null || checkboxProps === void 0 ? void 0 : checkboxProps.indeterminate) !== null && _a !== void 0 ? _a : indeterminate;
        } // Record checked


        return {
          node: /*#__PURE__*/React.createElement(Checkbox, _extends({}, checkboxProps, {
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
                  var checkedKeys = checked ? arrDel(originCheckedKeys, key) : arrAdd(originCheckedKeys, key);
                  triggerSingleSelection(key, !checked, checkedKeys, nativeEvent);
                } else {
                  // Always fill first
                  var result = conductCheck([].concat(_toConsumableArray(originCheckedKeys), [key]), true, keyEntities, isCheckboxDisabled);
                  var _checkedKeys = result.checkedKeys,
                      halfCheckedKeys = result.halfCheckedKeys;
                  var nextCheckedKeys = _checkedKeys; // If remove, we do it again to correction

                  if (checked) {
                    var tempKeySet = new Set(_checkedKeys);
                    tempKeySet["delete"](key);
                    nextCheckedKeys = conductCheck(Array.from(tempKeySet), {
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


    var selectionColumn = _defineProperty({
      width: selectionColWidth,
      className: "".concat(prefixCls, "-selection-column"),
      title: rowSelection.columnTitle || title,
      render: renderSelectionCell
    }, INTERNAL_COL_DEFINE, {
      className: "".concat(prefixCls, "-selection-col")
    });

    if (expandType === 'row' && columns.length && !expandIconColumnIndex) {
      var _columns = _toArray(columns),
          expandColumn = _columns[0],
          restColumns = _columns.slice(1);

      var selectionFixed = fixed || getFixedType(restColumns[0]);

      if (selectionFixed) {
        expandColumn.fixed = selectionFixed;
      }

      return [expandColumn, _extends(_extends({}, selectionColumn), {
        fixed: selectionFixed
      })].concat(_toConsumableArray(restColumns));
    }

    return [_extends(_extends({}, selectionColumn), {
      fixed: fixed || getFixedType(columns[0])
    })].concat(_toConsumableArray(columns));
  }, [getRowKey, flattedData, rowSelection, derivedSelectedKeys, derivedSelectedKeySet, derivedHalfSelectedKeySet, selectionColWidth, mergedSelections, expandType, lastSelectedKey, checkboxPropsMap, onSelectMultiple, triggerSingleSelection, isCheckboxDisabled]);
  return [transformColumns, derivedSelectedKeySet];
}