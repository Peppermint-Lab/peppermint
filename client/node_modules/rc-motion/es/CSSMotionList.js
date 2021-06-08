import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _objectSpread from "@babel/runtime/helpers/esm/objectSpread2";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _createSuper from "@babel/runtime/helpers/esm/createSuper";

/* eslint react/prop-types: 0 */
import * as React from 'react';
import OriginCSSMotion from './CSSMotion';
import { supportTransition } from './util/motion';
import { STATUS_ADD, STATUS_KEEP, STATUS_REMOVE, STATUS_REMOVED, diffKeys, parseKeys } from './util/diff';
var MOTION_PROP_NAMES = ['eventProps', 'visible', 'children', 'motionName', 'motionAppear', 'motionEnter', 'motionLeave', 'motionLeaveImmediately', 'motionDeadline', 'removeOnLeave', 'leavedClassName', 'onAppearStart', 'onAppearActive', 'onAppearEnd', 'onEnterStart', 'onEnterActive', 'onEnterEnd', 'onLeaveStart', 'onLeaveActive', 'onLeaveEnd'];
/**
 * Generate a CSSMotionList component with config
 * @param transitionSupport No need since CSSMotionList no longer depends on transition support
 * @param CSSMotion CSSMotion component
 */

export function genCSSMotionList(transitionSupport) {
  var CSSMotion = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : OriginCSSMotion;

  var CSSMotionList = /*#__PURE__*/function (_React$Component) {
    _inherits(CSSMotionList, _React$Component);

    var _super = _createSuper(CSSMotionList);

    function CSSMotionList() {
      var _this;

      _classCallCheck(this, CSSMotionList);

      _this = _super.apply(this, arguments);
      _this.state = {
        keyEntities: []
      };

      _this.removeKey = function (removeKey) {
        _this.setState(function (_ref) {
          var keyEntities = _ref.keyEntities;
          return {
            keyEntities: keyEntities.map(function (entity) {
              if (entity.key !== removeKey) return entity;
              return _objectSpread(_objectSpread({}, entity), {}, {
                status: STATUS_REMOVED
              });
            })
          };
        });
      };

      return _this;
    }

    _createClass(CSSMotionList, [{
      key: "render",
      value: function render() {
        var _this2 = this;

        var keyEntities = this.state.keyEntities;

        var _this$props = this.props,
            component = _this$props.component,
            children = _this$props.children,
            _onVisibleChanged = _this$props.onVisibleChanged,
            restProps = _objectWithoutProperties(_this$props, ["component", "children", "onVisibleChanged"]);

        var Component = component || React.Fragment;
        var motionProps = {};
        MOTION_PROP_NAMES.forEach(function (prop) {
          motionProps[prop] = restProps[prop];
          delete restProps[prop];
        });
        delete restProps.keys;
        return /*#__PURE__*/React.createElement(Component, restProps, keyEntities.map(function (_ref2) {
          var status = _ref2.status,
              eventProps = _objectWithoutProperties(_ref2, ["status"]);

          var visible = status === STATUS_ADD || status === STATUS_KEEP;
          return /*#__PURE__*/React.createElement(CSSMotion, _extends({}, motionProps, {
            key: eventProps.key,
            visible: visible,
            eventProps: eventProps,
            onVisibleChanged: function onVisibleChanged(changedVisible) {
              _onVisibleChanged === null || _onVisibleChanged === void 0 ? void 0 : _onVisibleChanged(changedVisible, {
                key: eventProps.key
              });

              if (!changedVisible) {
                _this2.removeKey(eventProps.key);
              }
            }
          }), children);
        }));
      }
    }], [{
      key: "getDerivedStateFromProps",
      value: function getDerivedStateFromProps(_ref3, _ref4) {
        var keys = _ref3.keys;
        var keyEntities = _ref4.keyEntities;
        var parsedKeyObjects = parseKeys(keys);
        var mixedKeyEntities = diffKeys(keyEntities, parsedKeyObjects);
        return {
          keyEntities: mixedKeyEntities.filter(function (entity) {
            var prevEntity = keyEntities.find(function (_ref5) {
              var key = _ref5.key;
              return entity.key === key;
            }); // Remove if already mark as removed

            if (prevEntity && prevEntity.status === STATUS_REMOVED && entity.status === STATUS_REMOVE) {
              return false;
            }

            return true;
          })
        };
      }
    }]);

    return CSSMotionList;
  }(React.Component);

  CSSMotionList.defaultProps = {
    component: 'div'
  };
  return CSSMotionList;
}
export default genCSSMotionList(supportTransition);