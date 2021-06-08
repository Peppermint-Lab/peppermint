"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var React = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _Title = _interopRequireDefault(require("./Title"));

var _Paragraph = _interopRequireDefault(require("./Paragraph"));

var _configProvider = require("../config-provider");

var _Element = _interopRequireDefault(require("./Element"));

var _Avatar = _interopRequireDefault(require("./Avatar"));

var _Button = _interopRequireDefault(require("./Button"));

var _Input = _interopRequireDefault(require("./Input"));

var _Image = _interopRequireDefault(require("./Image"));

function getComponentProps(prop) {
  if (prop && (0, _typeof2["default"])(prop) === 'object') {
    return prop;
  }

  return {};
}

function getAvatarBasicProps(hasTitle, hasParagraph) {
  if (hasTitle && !hasParagraph) {
    // Square avatar
    return {
      size: 'large',
      shape: 'square'
    };
  }

  return {
    size: 'large',
    shape: 'circle'
  };
}

function getTitleBasicProps(hasAvatar, hasParagraph) {
  if (!hasAvatar && hasParagraph) {
    return {
      width: '38%'
    };
  }

  if (hasAvatar && hasParagraph) {
    return {
      width: '50%'
    };
  }

  return {};
}

function getParagraphBasicProps(hasAvatar, hasTitle) {
  var basicProps = {}; // Width

  if (!hasAvatar || !hasTitle) {
    basicProps.width = '61%';
  } // Rows


  if (!hasAvatar && hasTitle) {
    basicProps.rows = 3;
  } else {
    basicProps.rows = 2;
  }

  return basicProps;
}

var Skeleton = function Skeleton(props) {
  var renderSkeleton = function renderSkeleton(_ref) {
    var getPrefixCls = _ref.getPrefixCls,
        direction = _ref.direction;
    var customizePrefixCls = props.prefixCls,
        loading = props.loading,
        className = props.className,
        children = props.children,
        avatar = props.avatar,
        title = props.title,
        paragraph = props.paragraph,
        active = props.active,
        round = props.round;
    var prefixCls = getPrefixCls('skeleton', customizePrefixCls);

    if (loading || !('loading' in props)) {
      var _classNames;

      var hasAvatar = !!avatar;
      var hasTitle = !!title;
      var hasParagraph = !!paragraph; // Avatar

      var avatarNode;

      if (hasAvatar) {
        var avatarProps = (0, _extends2["default"])((0, _extends2["default"])({
          prefixCls: "".concat(prefixCls, "-avatar")
        }, getAvatarBasicProps(hasTitle, hasParagraph)), getComponentProps(avatar)); // We direct use SkeletonElement as avatar in skeleton internal.

        avatarNode = /*#__PURE__*/React.createElement("div", {
          className: "".concat(prefixCls, "-header")
        }, /*#__PURE__*/React.createElement(_Element["default"], avatarProps));
      }

      var contentNode;

      if (hasTitle || hasParagraph) {
        // Title
        var $title;

        if (hasTitle) {
          var titleProps = (0, _extends2["default"])((0, _extends2["default"])({
            prefixCls: "".concat(prefixCls, "-title")
          }, getTitleBasicProps(hasAvatar, hasParagraph)), getComponentProps(title));
          $title = /*#__PURE__*/React.createElement(_Title["default"], titleProps);
        } // Paragraph


        var paragraphNode;

        if (hasParagraph) {
          var paragraphProps = (0, _extends2["default"])((0, _extends2["default"])({
            prefixCls: "".concat(prefixCls, "-paragraph")
          }, getParagraphBasicProps(hasAvatar, hasTitle)), getComponentProps(paragraph));
          paragraphNode = /*#__PURE__*/React.createElement(_Paragraph["default"], paragraphProps);
        }

        contentNode = /*#__PURE__*/React.createElement("div", {
          className: "".concat(prefixCls, "-content")
        }, $title, paragraphNode);
      }

      var cls = (0, _classnames["default"])(prefixCls, (_classNames = {}, (0, _defineProperty2["default"])(_classNames, "".concat(prefixCls, "-with-avatar"), hasAvatar), (0, _defineProperty2["default"])(_classNames, "".concat(prefixCls, "-active"), active), (0, _defineProperty2["default"])(_classNames, "".concat(prefixCls, "-rtl"), direction === 'rtl'), (0, _defineProperty2["default"])(_classNames, "".concat(prefixCls, "-round"), round), _classNames), className);
      return /*#__PURE__*/React.createElement("div", {
        className: cls
      }, avatarNode, contentNode);
    }

    return children;
  };

  return /*#__PURE__*/React.createElement(_configProvider.ConfigConsumer, null, renderSkeleton);
};

Skeleton.defaultProps = {
  avatar: false,
  title: true,
  paragraph: true
};
Skeleton.Button = _Button["default"];
Skeleton.Avatar = _Avatar["default"];
Skeleton.Input = _Input["default"];
Skeleton.Image = _Image["default"];
var _default = Skeleton;
exports["default"] = _default;