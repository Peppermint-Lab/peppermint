import _extends from "@babel/runtime/helpers/esm/extends";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import * as React from 'react';
import { useForm as useRcForm } from 'rc-field-form';
import scrollIntoView from 'scroll-into-view-if-needed';
import { toArray, getFieldId } from '../util';

function toNamePathStr(name) {
  var namePath = toArray(name);
  return namePath.join('_');
}

export default function useForm(form) {
  var _useRcForm = useRcForm(),
      _useRcForm2 = _slicedToArray(_useRcForm, 1),
      rcForm = _useRcForm2[0];

  var itemsRef = React.useRef({});
  var wrapForm = React.useMemo(function () {
    return form || _extends(_extends({}, rcForm), {
      __INTERNAL__: {
        itemRef: function itemRef(name) {
          return function (node) {
            var namePathStr = toNamePathStr(name);

            if (node) {
              itemsRef.current[namePathStr] = node;
            } else {
              delete itemsRef.current[namePathStr];
            }
          };
        }
      },
      scrollToField: function scrollToField(name) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var namePath = toArray(name);
        var fieldId = getFieldId(namePath, wrapForm.__INTERNAL__.name);
        var node = fieldId ? document.getElementById(fieldId) : null;

        if (node) {
          scrollIntoView(node, _extends({
            scrollMode: 'if-needed',
            block: 'nearest'
          }, options));
        }
      },
      getFieldInstance: function getFieldInstance(name) {
        var namePathStr = toNamePathStr(name);
        return itemsRef.current[namePathStr];
      }
    });
  }, [form, rcForm]);
  return [wrapForm];
}