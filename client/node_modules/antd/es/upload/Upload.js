import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _extends from "@babel/runtime/helpers/esm/extends";
import _typeof from "@babel/runtime/helpers/esm/typeof";
import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import _regeneratorRuntime from "@babel/runtime/regenerator";

var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

import * as React from 'react';
import RcUpload from 'rc-upload';
import useMergedState from "rc-util/es/hooks/useMergedState";
import classNames from 'classnames';
import Dragger from './Dragger';
import UploadList from './UploadList';
import { file2Obj, getFileItem, removeFileItem, updateFileList } from './utils';
import LocaleReceiver from '../locale-provider/LocaleReceiver';
import defaultLocale from '../locale/default';
import { ConfigContext } from '../config-provider';
import devWarning from '../_util/devWarning';
var LIST_IGNORE = "__LIST_IGNORE_".concat(Date.now(), "__");

var InternalUpload = function InternalUpload(props, ref) {
  var _classNames2;

  var fileList = props.fileList,
      defaultFileList = props.defaultFileList,
      onRemove = props.onRemove,
      showUploadList = props.showUploadList,
      listType = props.listType,
      onPreview = props.onPreview,
      onDownload = props.onDownload,
      onChange = props.onChange,
      previewFile = props.previewFile,
      disabled = props.disabled,
      propLocale = props.locale,
      iconRender = props.iconRender,
      isImageUrl = props.isImageUrl,
      progress = props.progress,
      customizePrefixCls = props.prefixCls,
      className = props.className,
      type = props.type,
      children = props.children,
      style = props.style,
      itemRender = props.itemRender,
      maxCount = props.maxCount;

  var _useMergedState = useMergedState(defaultFileList || [], {
    value: fileList,
    postState: function postState(list) {
      return list !== null && list !== void 0 ? list : [];
    }
  }),
      _useMergedState2 = _slicedToArray(_useMergedState, 2),
      mergedFileList = _useMergedState2[0],
      setMergedFileList = _useMergedState2[1];

  var _React$useState = React.useState('drop'),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      dragState = _React$useState2[0],
      setDragState = _React$useState2[1];

  var upload = React.useRef();
  React.useEffect(function () {
    devWarning('fileList' in props || !('value' in props), 'Upload', '`value` is not a valid prop, do you mean `fileList`?');
    devWarning(!('transformFile' in props), 'Upload', '`transformFile` is deprecated. Please use `beforeUpload` directly.');
  }, []); // Control mode will auto fill file uid if not provided

  React.useMemo(function () {
    var timestamp = Date.now();
    (fileList || []).forEach(function (file, index) {
      if (!file.uid && !Object.isFrozen(file)) {
        file.uid = "__AUTO__".concat(timestamp, "_").concat(index, "__");
      }
    });
  }, [fileList]);

  var onInternalChange = function onInternalChange(file, changedFileList, event) {
    var cloneList = _toConsumableArray(changedFileList); // Cut to match count


    if (maxCount === 1) {
      cloneList = cloneList.slice(-1);
    } else if (maxCount) {
      cloneList = cloneList.slice(0, maxCount);
    }

    setMergedFileList(cloneList);
    var changeInfo = {
      file: file,
      fileList: cloneList
    };

    if (event) {
      changeInfo.event = event;
    }

    onChange === null || onChange === void 0 ? void 0 : onChange(changeInfo);
  };

  var mergedBeforeUpload = function mergedBeforeUpload(file, fileListArgs) {
    return __awaiter(void 0, void 0, void 0, /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
      var beforeUpload, transformFile, parsedFile, result;
      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              beforeUpload = props.beforeUpload, transformFile = props.transformFile;
              parsedFile = file;

              if (!beforeUpload) {
                _context.next = 13;
                break;
              }

              _context.next = 5;
              return beforeUpload(file, fileListArgs);

            case 5:
              result = _context.sent;

              if (!(result === false)) {
                _context.next = 8;
                break;
              }

              return _context.abrupt("return", false);

            case 8:
              // Hack for LIST_IGNORE, we add additional info to remove from the list
              delete file[LIST_IGNORE];

              if (!(result === LIST_IGNORE)) {
                _context.next = 12;
                break;
              }

              Object.defineProperty(file, LIST_IGNORE, {
                value: true,
                configurable: true
              });
              return _context.abrupt("return", false);

            case 12:
              if (_typeof(result) === 'object' && result) {
                parsedFile = result;
              }

            case 13:
              if (!transformFile) {
                _context.next = 17;
                break;
              }

              _context.next = 16;
              return transformFile(parsedFile);

            case 16:
              parsedFile = _context.sent;

            case 17:
              return _context.abrupt("return", parsedFile);

            case 18:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));
  };

  var onBatchStart = function onBatchStart(batchFileInfoList) {
    // Skip file which marked as `LIST_IGNORE`, these file will not add to file list
    var filteredFileInfoList = batchFileInfoList.filter(function (info) {
      return !info.file[LIST_IGNORE];
    }); // Nothing to do since no file need upload

    if (!filteredFileInfoList.length) {
      return;
    }

    var objectFileList = filteredFileInfoList.map(function (info) {
      return file2Obj(info.file);
    }); // Concat new files with prev files

    var newFileList = _toConsumableArray(mergedFileList);

    objectFileList.forEach(function (fileObj) {
      // Replace file if exist
      newFileList = updateFileList(fileObj, newFileList);
    });
    objectFileList.forEach(function (fileObj, index) {
      // Repeat trigger `onChange` event for compatible
      var triggerFileObj = fileObj;

      if (!filteredFileInfoList[index].parsedFile) {
        // `beforeUpload` return false
        var originFileObj = fileObj.originFileObj;
        var clone = new File([originFileObj], originFileObj.name, {
          type: originFileObj.type
        });
        clone.uid = fileObj.uid;
        triggerFileObj = clone;
      } else {
        // Inject `uploading` status
        fileObj.status = 'uploading';
      }

      onInternalChange(triggerFileObj, newFileList);
    });
  };

  var onSuccess = function onSuccess(response, file, xhr) {
    try {
      if (typeof response === 'string') {
        response = JSON.parse(response);
      }
    } catch (e) {
      /* do nothing */
    } // removed


    if (!getFileItem(file, mergedFileList)) {
      return;
    }

    var targetItem = file2Obj(file);
    targetItem.status = 'done';
    targetItem.percent = 100;
    targetItem.response = response;
    targetItem.xhr = xhr;
    var nextFileList = updateFileList(targetItem, mergedFileList);
    onInternalChange(targetItem, nextFileList);
  };

  var onProgress = function onProgress(e, file) {
    // removed
    if (!getFileItem(file, mergedFileList)) {
      return;
    }

    var targetItem = file2Obj(file);
    targetItem.status = 'uploading';
    targetItem.percent = e.percent;
    var nextFileList = updateFileList(targetItem, mergedFileList);
    onInternalChange(targetItem, nextFileList, e);
  };

  var onError = function onError(error, response, file) {
    // removed
    if (!getFileItem(file, mergedFileList)) {
      return;
    }

    var targetItem = file2Obj(file);
    targetItem.error = error;
    targetItem.response = response;
    targetItem.status = 'error';
    var nextFileList = updateFileList(targetItem, mergedFileList);
    onInternalChange(targetItem, nextFileList);
  };

  var handleRemove = function handleRemove(file) {
    var currentFile;
    Promise.resolve(typeof onRemove === 'function' ? onRemove(file) : onRemove).then(function (ret) {
      var _a; // Prevent removing file


      if (ret === false) {
        return;
      }

      var removedFileList = removeFileItem(file, mergedFileList);

      if (removedFileList) {
        currentFile = _extends(_extends({}, file), {
          status: 'removed'
        });
        mergedFileList === null || mergedFileList === void 0 ? void 0 : mergedFileList.forEach(function (item) {
          var matchKey = currentFile.uid !== undefined ? 'uid' : 'name';

          if (item[matchKey] === currentFile[matchKey] && !Object.isFrozen(item)) {
            item.status = 'removed';
          }
        });
        (_a = upload.current) === null || _a === void 0 ? void 0 : _a.abort(currentFile);
        onInternalChange(currentFile, removedFileList);
      }
    });
  };

  var onFileDrop = function onFileDrop(e) {
    e.stopPropagation();
    setDragState(e.type);
  }; // Test needs


  React.useImperativeHandle(ref, function () {
    return {
      onBatchStart: onBatchStart,
      onSuccess: onSuccess,
      onProgress: onProgress,
      onError: onError,
      fileList: mergedFileList,
      upload: upload.current
    };
  });

  var _React$useContext = React.useContext(ConfigContext),
      getPrefixCls = _React$useContext.getPrefixCls,
      direction = _React$useContext.direction;

  var prefixCls = getPrefixCls('upload', customizePrefixCls);

  var rcUploadProps = _extends(_extends({
    onBatchStart: onBatchStart,
    onError: onError,
    onProgress: onProgress,
    onSuccess: onSuccess
  }, props), {
    prefixCls: prefixCls,
    beforeUpload: mergedBeforeUpload,
    onChange: undefined
  });

  delete rcUploadProps.className;
  delete rcUploadProps.style; // Remove id to avoid open by label when trigger is hidden
  // !children: https://github.com/ant-design/ant-design/issues/14298
  // disabled: https://github.com/ant-design/ant-design/issues/16478
  //           https://github.com/ant-design/ant-design/issues/24197

  if (!children || disabled) {
    delete rcUploadProps.id;
  }

  var renderUploadList = function renderUploadList(button) {
    return showUploadList ? /*#__PURE__*/React.createElement(LocaleReceiver, {
      componentName: "Upload",
      defaultLocale: defaultLocale.Upload
    }, function (locale) {
      var _ref = typeof showUploadList === 'boolean' ? {} : showUploadList,
          showRemoveIcon = _ref.showRemoveIcon,
          showPreviewIcon = _ref.showPreviewIcon,
          showDownloadIcon = _ref.showDownloadIcon,
          removeIcon = _ref.removeIcon,
          downloadIcon = _ref.downloadIcon;

      return /*#__PURE__*/React.createElement(UploadList, {
        listType: listType,
        items: mergedFileList,
        previewFile: previewFile,
        onPreview: onPreview,
        onDownload: onDownload,
        onRemove: handleRemove,
        showRemoveIcon: !disabled && showRemoveIcon,
        showPreviewIcon: showPreviewIcon,
        showDownloadIcon: showDownloadIcon,
        removeIcon: removeIcon,
        downloadIcon: downloadIcon,
        iconRender: iconRender,
        locale: _extends(_extends({}, locale), propLocale),
        isImageUrl: isImageUrl,
        progress: progress,
        appendAction: button,
        itemRender: itemRender
      });
    }) : button;
  };

  if (type === 'drag') {
    var _classNames;

    var dragCls = classNames(prefixCls, (_classNames = {}, _defineProperty(_classNames, "".concat(prefixCls, "-drag"), true), _defineProperty(_classNames, "".concat(prefixCls, "-drag-uploading"), mergedFileList.some(function (file) {
      return file.status === 'uploading';
    })), _defineProperty(_classNames, "".concat(prefixCls, "-drag-hover"), dragState === 'dragover'), _defineProperty(_classNames, "".concat(prefixCls, "-disabled"), disabled), _defineProperty(_classNames, "".concat(prefixCls, "-rtl"), direction === 'rtl'), _classNames), className);
    return /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("div", {
      className: dragCls,
      onDrop: onFileDrop,
      onDragOver: onFileDrop,
      onDragLeave: onFileDrop,
      style: style
    }, /*#__PURE__*/React.createElement(RcUpload, _extends({}, rcUploadProps, {
      ref: upload,
      className: "".concat(prefixCls, "-btn")
    }), /*#__PURE__*/React.createElement("div", {
      className: "".concat(prefixCls, "-drag-container")
    }, children))), renderUploadList());
  }

  var uploadButtonCls = classNames(prefixCls, (_classNames2 = {}, _defineProperty(_classNames2, "".concat(prefixCls, "-select"), true), _defineProperty(_classNames2, "".concat(prefixCls, "-select-").concat(listType), true), _defineProperty(_classNames2, "".concat(prefixCls, "-disabled"), disabled), _defineProperty(_classNames2, "".concat(prefixCls, "-rtl"), direction === 'rtl'), _classNames2));
  var uploadButton = /*#__PURE__*/React.createElement("div", {
    className: uploadButtonCls,
    style: children ? undefined : {
      display: 'none'
    }
  }, /*#__PURE__*/React.createElement(RcUpload, _extends({}, rcUploadProps, {
    ref: upload
  })));

  if (listType === 'picture-card') {
    return /*#__PURE__*/React.createElement("span", {
      className: classNames("".concat(prefixCls, "-picture-card-wrapper"), className)
    }, renderUploadList(uploadButton));
  }

  return /*#__PURE__*/React.createElement("span", {
    className: className
  }, uploadButton, renderUploadList());
};

var Upload = /*#__PURE__*/React.forwardRef(InternalUpload);
Upload.Dragger = Dragger;
Upload.LIST_IGNORE = LIST_IGNORE;
Upload.displayName = 'Upload';
Upload.defaultProps = {
  type: 'select',
  multiple: false,
  action: '',
  data: {},
  accept: '',
  showUploadList: true,
  listType: 'text',
  className: '',
  disabled: false,
  supportServerRender: true
};
export default Upload;