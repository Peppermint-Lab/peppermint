"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var React = _interopRequireWildcard(require("react"));

var _rcMotion = _interopRequireWildcard(require("rc-motion"));

var _classnames = _interopRequireDefault(require("classnames"));

var _LoadingOutlined = _interopRequireDefault(require("@ant-design/icons/LoadingOutlined"));

var _PaperClipOutlined = _interopRequireDefault(require("@ant-design/icons/PaperClipOutlined"));

var _PictureTwoTone = _interopRequireDefault(require("@ant-design/icons/PictureTwoTone"));

var _FileTwoTone = _interopRequireDefault(require("@ant-design/icons/FileTwoTone"));

var _reactNode = require("../../_util/reactNode");

var _utils = require("../utils");

var _motion = _interopRequireDefault(require("../../_util/motion"));

var _configProvider = require("../../config-provider");

var _button = _interopRequireDefault(require("../../button"));

var _useForceUpdate = _interopRequireDefault(require("../../_util/hooks/useForceUpdate"));

var _ListItem = _interopRequireDefault(require("./ListItem"));

var listItemMotion = (0, _extends2["default"])({}, _motion["default"]);
delete listItemMotion.onAppearEnd;
delete listItemMotion.onEnterEnd;
delete listItemMotion.onLeaveEnd;

var InternalUploadList = function InternalUploadList(_ref, ref) {
  var _classNames;

  var listType = _ref.listType,
      previewFile = _ref.previewFile,
      onPreview = _ref.onPreview,
      onDownload = _ref.onDownload,
      onRemove = _ref.onRemove,
      locale = _ref.locale,
      iconRender = _ref.iconRender,
      isImgUrl = _ref.isImageUrl,
      customizePrefixCls = _ref.prefixCls,
      _ref$items = _ref.items,
      items = _ref$items === void 0 ? [] : _ref$items,
      showPreviewIcon = _ref.showPreviewIcon,
      showRemoveIcon = _ref.showRemoveIcon,
      showDownloadIcon = _ref.showDownloadIcon,
      removeIcon = _ref.removeIcon,
      downloadIcon = _ref.downloadIcon,
      progress = _ref.progress,
      appendAction = _ref.appendAction,
      itemRender = _ref.itemRender;
  var forceUpdate = (0, _useForceUpdate["default"])();

  var _React$useState = React.useState(false),
      _React$useState2 = (0, _slicedToArray2["default"])(_React$useState, 2),
      motionAppear = _React$useState2[0],
      setMotionAppear = _React$useState2[1]; // ============================= Effect =============================


  React.useEffect(function () {
    if (listType !== 'picture' && listType !== 'picture-card') {
      return;
    }

    (items || []).forEach(function (file) {
      if (typeof document === 'undefined' || typeof window === 'undefined' || !window.FileReader || !window.File || !(file.originFileObj instanceof File || file.originFileObj instanceof Blob) || file.thumbUrl !== undefined) {
        return;
      }

      file.thumbUrl = '';

      if (previewFile) {
        previewFile(file.originFileObj).then(function (previewDataUrl) {
          // Need append '' to avoid dead loop
          file.thumbUrl = previewDataUrl || '';
          forceUpdate();
        });
      }
    });
  }, [listType, items, previewFile]);
  React.useEffect(function () {
    setMotionAppear(true);
  }, []); // ============================= Events =============================

  var onInternalPreview = function onInternalPreview(file, e) {
    if (!onPreview) {
      return;
    }

    e.preventDefault();
    return onPreview(file);
  };

  var onInternalDownload = function onInternalDownload(file) {
    if (typeof onDownload === 'function') {
      onDownload(file);
    } else if (file.url) {
      window.open(file.url);
    }
  };

  var onInternalClose = function onInternalClose(file) {
    onRemove === null || onRemove === void 0 ? void 0 : onRemove(file);
  };

  var internalIconRender = function internalIconRender(file) {
    if (iconRender) {
      return iconRender(file, listType);
    }

    var isLoading = file.status === 'uploading';
    var fileIcon = isImgUrl && isImgUrl(file) ? /*#__PURE__*/React.createElement(_PictureTwoTone["default"], null) : /*#__PURE__*/React.createElement(_FileTwoTone["default"], null);
    var icon = isLoading ? /*#__PURE__*/React.createElement(_LoadingOutlined["default"], null) : /*#__PURE__*/React.createElement(_PaperClipOutlined["default"], null);

    if (listType === 'picture') {
      icon = isLoading ? /*#__PURE__*/React.createElement(_LoadingOutlined["default"], null) : fileIcon;
    } else if (listType === 'picture-card') {
      icon = isLoading ? locale.uploading : fileIcon;
    }

    return icon;
  };

  var actionIconRender = function actionIconRender(customIcon, callback, prefixCls, title) {
    var btnProps = {
      type: 'text',
      size: 'small',
      title: title,
      onClick: function onClick(e) {
        callback();

        if ((0, _reactNode.isValidElement)(customIcon) && customIcon.props.onClick) {
          customIcon.props.onClick(e);
        }
      },
      className: "".concat(prefixCls, "-list-item-card-actions-btn")
    };

    if ((0, _reactNode.isValidElement)(customIcon)) {
      var btnIcon = (0, _reactNode.cloneElement)(customIcon, (0, _extends2["default"])((0, _extends2["default"])({}, customIcon.props), {
        onClick: function onClick() {}
      }));
      return /*#__PURE__*/React.createElement(_button["default"], (0, _extends2["default"])({}, btnProps, {
        icon: btnIcon
      }));
    }

    return /*#__PURE__*/React.createElement(_button["default"], btnProps, /*#__PURE__*/React.createElement("span", null, customIcon));
  }; // ============================== Ref ===============================
  // Test needs


  React.useImperativeHandle(ref, function () {
    return {
      handlePreview: onInternalPreview,
      handleDownload: onInternalDownload
    };
  });

  var _React$useContext = React.useContext(_configProvider.ConfigContext),
      getPrefixCls = _React$useContext.getPrefixCls,
      direction = _React$useContext.direction; // ============================= Render =============================


  var prefixCls = getPrefixCls('upload', customizePrefixCls);
  var listClassNames = (0, _classnames["default"])((_classNames = {}, (0, _defineProperty2["default"])(_classNames, "".concat(prefixCls, "-list"), true), (0, _defineProperty2["default"])(_classNames, "".concat(prefixCls, "-list-").concat(listType), true), (0, _defineProperty2["default"])(_classNames, "".concat(prefixCls, "-list-rtl"), direction === 'rtl'), _classNames)); // >>> Motion config

  var motionKeyList = (0, _toConsumableArray2["default"])(items.map(function (file) {
    return {
      key: file.uid,
      file: file
    };
  }));
  var animationDirection = listType === 'picture-card' ? 'animate-inline' : 'animate'; // const transitionName = list.length === 0 ? '' : `${prefixCls}-${animationDirection}`;

  var motionConfig = {
    motionDeadline: 2000,
    motionName: "".concat(prefixCls, "-").concat(animationDirection),
    keys: motionKeyList,
    motionAppear: motionAppear
  };

  if (listType !== 'picture-card') {
    motionConfig = (0, _extends2["default"])((0, _extends2["default"])({}, listItemMotion), motionConfig);
  }

  return /*#__PURE__*/React.createElement("div", {
    className: listClassNames
  }, /*#__PURE__*/React.createElement(_rcMotion.CSSMotionList, (0, _extends2["default"])({}, motionConfig, {
    component: false
  }), function (_ref2) {
    var key = _ref2.key,
        file = _ref2.file,
        motionClassName = _ref2.className,
        motionStyle = _ref2.style;
    return /*#__PURE__*/React.createElement(_ListItem["default"], {
      key: key,
      locale: locale,
      prefixCls: prefixCls,
      className: motionClassName,
      style: motionStyle,
      file: file,
      items: items,
      progress: progress,
      listType: listType,
      isImgUrl: isImgUrl,
      showPreviewIcon: showPreviewIcon,
      showRemoveIcon: showRemoveIcon,
      showDownloadIcon: showDownloadIcon,
      removeIcon: removeIcon,
      downloadIcon: downloadIcon,
      iconRender: internalIconRender,
      actionIconRender: actionIconRender,
      itemRender: itemRender,
      onPreview: onInternalPreview,
      onDownload: onInternalDownload,
      onClose: onInternalClose
    });
  }), appendAction && /*#__PURE__*/React.createElement(_rcMotion["default"], motionConfig, function (_ref3) {
    var motionClassName = _ref3.className,
        motionStyle = _ref3.style;
    return (0, _reactNode.cloneElement)(appendAction, function (oriProps) {
      return {
        className: (0, _classnames["default"])(oriProps.className, motionClassName),
        style: (0, _extends2["default"])((0, _extends2["default"])({}, motionStyle), oriProps.style)
      };
    });
  }));
};

var UploadList = /*#__PURE__*/React.forwardRef(InternalUploadList);
UploadList.displayName = 'UploadList';
UploadList.defaultProps = {
  listType: 'text',
  progress: {
    strokeWidth: 2,
    showInfo: false
  },
  showRemoveIcon: true,
  showDownloadIcon: false,
  showPreviewIcon: true,
  previewFile: _utils.previewImage,
  isImageUrl: _utils.isImageUrl
};
var _default = UploadList;
exports["default"] = _default;