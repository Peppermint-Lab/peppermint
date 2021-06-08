import _extends from "@babel/runtime/helpers/esm/extends";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import * as React from 'react';
import CSSMotion from 'rc-motion';
import classNames from 'classnames';
import EyeOutlined from "@ant-design/icons/es/icons/EyeOutlined";
import DeleteOutlined from "@ant-design/icons/es/icons/DeleteOutlined";
import DownloadOutlined from "@ant-design/icons/es/icons/DownloadOutlined";
import Tooltip from '../../tooltip';
import Progress from '../../progress';
import { ConfigContext } from '../../config-provider';
var ListItem = /*#__PURE__*/React.forwardRef(function (_ref, ref) {
  var _classNames3;

  var prefixCls = _ref.prefixCls,
      className = _ref.className,
      style = _ref.style,
      locale = _ref.locale,
      listType = _ref.listType,
      file = _ref.file,
      items = _ref.items,
      progressProps = _ref.progress,
      iconRender = _ref.iconRender,
      actionIconRender = _ref.actionIconRender,
      itemRender = _ref.itemRender,
      isImgUrl = _ref.isImgUrl,
      showPreviewIcon = _ref.showPreviewIcon,
      showRemoveIcon = _ref.showRemoveIcon,
      showDownloadIcon = _ref.showDownloadIcon,
      customRemoveIcon = _ref.removeIcon,
      customDownloadIcon = _ref.downloadIcon,
      onPreview = _ref.onPreview,
      onDownload = _ref.onDownload,
      onClose = _ref.onClose;

  var _a, _b; // Delay to show the progress bar


  var _React$useState = React.useState(false),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      showProgress = _React$useState2[0],
      setShowProgress = _React$useState2[1];

  var progressRafRef = React.useRef();
  React.useEffect(function () {
    progressRafRef.current = setTimeout(function () {
      setShowProgress(true);
    }, 300);
    return function () {
      window.clearTimeout(progressRafRef.current);
    };
  }, []); // This is used for legacy span make scrollHeight the wrong value.
  // We will force these to be `display: block` with non `picture-card`

  var spanClassName = "".concat(prefixCls, "-span");
  var iconNode = iconRender(file);
  var icon = /*#__PURE__*/React.createElement("div", {
    className: "".concat(prefixCls, "-text-icon")
  }, iconNode);

  if (listType === 'picture' || listType === 'picture-card') {
    if (file.status === 'uploading' || !file.thumbUrl && !file.url) {
      var _classNames;

      var uploadingClassName = classNames((_classNames = {}, _defineProperty(_classNames, "".concat(prefixCls, "-list-item-thumbnail"), true), _defineProperty(_classNames, "".concat(prefixCls, "-list-item-file"), file.status !== 'uploading'), _classNames));
      icon = /*#__PURE__*/React.createElement("div", {
        className: uploadingClassName
      }, iconNode);
    } else {
      var _classNames2;

      var thumbnail = (isImgUrl === null || isImgUrl === void 0 ? void 0 : isImgUrl(file)) ? /*#__PURE__*/React.createElement("img", {
        src: file.thumbUrl || file.url,
        alt: file.name,
        className: "".concat(prefixCls, "-list-item-image")
      }) : iconNode;
      var aClassName = classNames((_classNames2 = {}, _defineProperty(_classNames2, "".concat(prefixCls, "-list-item-thumbnail"), true), _defineProperty(_classNames2, "".concat(prefixCls, "-list-item-file"), isImgUrl && !isImgUrl(file)), _classNames2));
      icon = /*#__PURE__*/React.createElement("a", {
        className: aClassName,
        onClick: function onClick(e) {
          return onPreview(file, e);
        },
        href: file.url || file.thumbUrl,
        target: "_blank",
        rel: "noopener noreferrer"
      }, thumbnail);
    }
  }

  var infoUploadingClass = classNames((_classNames3 = {}, _defineProperty(_classNames3, "".concat(prefixCls, "-list-item"), true), _defineProperty(_classNames3, "".concat(prefixCls, "-list-item-").concat(file.status), true), _defineProperty(_classNames3, "".concat(prefixCls, "-list-item-list-type-").concat(listType), true), _classNames3));
  var linkProps = typeof file.linkProps === 'string' ? JSON.parse(file.linkProps) : file.linkProps;
  var removeIcon = showRemoveIcon ? actionIconRender((typeof customRemoveIcon === 'function' ? customRemoveIcon(file) : customRemoveIcon) || /*#__PURE__*/React.createElement(DeleteOutlined, null), function () {
    return onClose(file);
  }, prefixCls, locale.removeFile) : null;
  var downloadIcon = showDownloadIcon && file.status === 'done' ? actionIconRender((typeof customDownloadIcon === 'function' ? customDownloadIcon(file) : customDownloadIcon) || /*#__PURE__*/React.createElement(DownloadOutlined, null), function () {
    return onDownload(file);
  }, prefixCls, locale.downloadFile) : null;
  var downloadOrDelete = listType !== 'picture-card' && /*#__PURE__*/React.createElement("span", {
    key: "download-delete",
    className: classNames("".concat(prefixCls, "-list-item-card-actions"), {
      picture: listType === 'picture'
    })
  }, downloadIcon, removeIcon);
  var listItemNameClass = classNames("".concat(prefixCls, "-list-item-name"));
  var preview = file.url ? [/*#__PURE__*/React.createElement("a", _extends({
    key: "view",
    target: "_blank",
    rel: "noopener noreferrer",
    className: listItemNameClass,
    title: file.name
  }, linkProps, {
    href: file.url,
    onClick: function onClick(e) {
      return onPreview(file, e);
    }
  }), file.name), downloadOrDelete] : [/*#__PURE__*/React.createElement("span", {
    key: "view",
    className: listItemNameClass,
    onClick: function onClick(e) {
      return onPreview(file, e);
    },
    title: file.name
  }, file.name), downloadOrDelete];
  var previewStyle = {
    pointerEvents: 'none',
    opacity: 0.5
  };
  var previewIcon = showPreviewIcon ? /*#__PURE__*/React.createElement("a", {
    href: file.url || file.thumbUrl,
    target: "_blank",
    rel: "noopener noreferrer",
    style: file.url || file.thumbUrl ? undefined : previewStyle,
    onClick: function onClick(e) {
      return onPreview(file, e);
    },
    title: locale.previewFile
  }, /*#__PURE__*/React.createElement(EyeOutlined, null)) : null;
  var actions = listType === 'picture-card' && file.status !== 'uploading' && /*#__PURE__*/React.createElement("span", {
    className: "".concat(prefixCls, "-list-item-actions")
  }, previewIcon, file.status === 'done' && downloadIcon, removeIcon);
  var message;

  if (file.response && typeof file.response === 'string') {
    message = file.response;
  } else {
    message = ((_a = file.error) === null || _a === void 0 ? void 0 : _a.statusText) || ((_b = file.error) === null || _b === void 0 ? void 0 : _b.message) || locale.uploadError;
  }

  var iconAndPreview = /*#__PURE__*/React.createElement("span", {
    className: spanClassName
  }, icon, preview);

  var _React$useContext = React.useContext(ConfigContext),
      getPrefixCls = _React$useContext.getPrefixCls;

  var rootPrefixCls = getPrefixCls();
  var dom = /*#__PURE__*/React.createElement("div", {
    className: infoUploadingClass
  }, /*#__PURE__*/React.createElement("div", {
    className: "".concat(prefixCls, "-list-item-info")
  }, iconAndPreview), actions, showProgress && /*#__PURE__*/React.createElement(CSSMotion, {
    motionName: "".concat(rootPrefixCls, "-fade"),
    visible: file.status === 'uploading',
    motionDeadline: 2000
  }, function (_ref2) {
    var motionClassName = _ref2.className;
    // show loading icon if upload progress listener is disabled
    var loadingProgress = 'percent' in file ? /*#__PURE__*/React.createElement(Progress, _extends({}, progressProps, {
      type: "line",
      percent: file.percent
    })) : null;
    return /*#__PURE__*/React.createElement("div", {
      className: classNames("".concat(prefixCls, "-list-item-progress"), motionClassName)
    }, loadingProgress);
  }));
  var listContainerNameClass = classNames("".concat(prefixCls, "-list-").concat(listType, "-container"), className);
  var item = file.status === 'error' ? /*#__PURE__*/React.createElement(Tooltip, {
    title: message,
    getPopupContainer: function getPopupContainer(node) {
      return node.parentNode;
    }
  }, dom) : dom;
  return /*#__PURE__*/React.createElement("div", {
    className: listContainerNameClass,
    style: style,
    ref: ref
  }, itemRender ? itemRender(item, file, items) : item);
});
export default ListItem;