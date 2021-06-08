import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import CSSMotion, { CSSMotionList } from 'rc-motion';
import classNames from 'classnames';
import LoadingOutlined from "@ant-design/icons/es/icons/LoadingOutlined";
import PaperClipOutlined from "@ant-design/icons/es/icons/PaperClipOutlined";
import PictureTwoTone from "@ant-design/icons/es/icons/PictureTwoTone";
import FileTwoTone from "@ant-design/icons/es/icons/FileTwoTone";
import { cloneElement, isValidElement } from '../../_util/reactNode';
import { previewImage, isImageUrl } from '../utils';
import collapseMotion from '../../_util/motion';
import { ConfigContext } from '../../config-provider';
import Button from '../../button';
import useForceUpdate from '../../_util/hooks/useForceUpdate';
import ListItem from './ListItem';

var listItemMotion = _extends({}, collapseMotion);

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
  var forceUpdate = useForceUpdate();

  var _React$useState = React.useState(false),
      _React$useState2 = _slicedToArray(_React$useState, 2),
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
    var fileIcon = isImgUrl && isImgUrl(file) ? /*#__PURE__*/React.createElement(PictureTwoTone, null) : /*#__PURE__*/React.createElement(FileTwoTone, null);
    var icon = isLoading ? /*#__PURE__*/React.createElement(LoadingOutlined, null) : /*#__PURE__*/React.createElement(PaperClipOutlined, null);

    if (listType === 'picture') {
      icon = isLoading ? /*#__PURE__*/React.createElement(LoadingOutlined, null) : fileIcon;
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

        if (isValidElement(customIcon) && customIcon.props.onClick) {
          customIcon.props.onClick(e);
        }
      },
      className: "".concat(prefixCls, "-list-item-card-actions-btn")
    };

    if (isValidElement(customIcon)) {
      var btnIcon = cloneElement(customIcon, _extends(_extends({}, customIcon.props), {
        onClick: function onClick() {}
      }));
      return /*#__PURE__*/React.createElement(Button, _extends({}, btnProps, {
        icon: btnIcon
      }));
    }

    return /*#__PURE__*/React.createElement(Button, btnProps, /*#__PURE__*/React.createElement("span", null, customIcon));
  }; // ============================== Ref ===============================
  // Test needs


  React.useImperativeHandle(ref, function () {
    return {
      handlePreview: onInternalPreview,
      handleDownload: onInternalDownload
    };
  });

  var _React$useContext = React.useContext(ConfigContext),
      getPrefixCls = _React$useContext.getPrefixCls,
      direction = _React$useContext.direction; // ============================= Render =============================


  var prefixCls = getPrefixCls('upload', customizePrefixCls);
  var listClassNames = classNames((_classNames = {}, _defineProperty(_classNames, "".concat(prefixCls, "-list"), true), _defineProperty(_classNames, "".concat(prefixCls, "-list-").concat(listType), true), _defineProperty(_classNames, "".concat(prefixCls, "-list-rtl"), direction === 'rtl'), _classNames)); // >>> Motion config

  var motionKeyList = _toConsumableArray(items.map(function (file) {
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
    motionConfig = _extends(_extends({}, listItemMotion), motionConfig);
  }

  return /*#__PURE__*/React.createElement("div", {
    className: listClassNames
  }, /*#__PURE__*/React.createElement(CSSMotionList, _extends({}, motionConfig, {
    component: false
  }), function (_ref2) {
    var key = _ref2.key,
        file = _ref2.file,
        motionClassName = _ref2.className,
        motionStyle = _ref2.style;
    return /*#__PURE__*/React.createElement(ListItem, {
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
  }), appendAction && /*#__PURE__*/React.createElement(CSSMotion, motionConfig, function (_ref3) {
    var motionClassName = _ref3.className,
        motionStyle = _ref3.style;
    return cloneElement(appendAction, function (oriProps) {
      return {
        className: classNames(oriProps.className, motionClassName),
        style: _extends(_extends({}, motionStyle), oriProps.style)
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
  previewFile: previewImage,
  isImageUrl: isImageUrl
};
export default UploadList;