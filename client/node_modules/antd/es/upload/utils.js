import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
import _extends from "@babel/runtime/helpers/esm/extends";
export function file2Obj(file) {
  return _extends(_extends({}, file), {
    lastModified: file.lastModified,
    lastModifiedDate: file.lastModifiedDate,
    name: file.name,
    size: file.size,
    type: file.type,
    uid: file.uid,
    percent: 0,
    originFileObj: file
  });
}
/** Upload fileList. Replace file if exist or just push into it. */

export function updateFileList(file, fileList) {
  var nextFileList = _toConsumableArray(fileList);

  var fileIndex = nextFileList.findIndex(function (_ref) {
    var uid = _ref.uid;
    return uid === file.uid;
  });

  if (fileIndex === -1) {
    nextFileList.push(file);
  } else {
    nextFileList[fileIndex] = file;
  }

  return nextFileList;
}
export function getFileItem(file, fileList) {
  var matchKey = file.uid !== undefined ? 'uid' : 'name';
  return fileList.filter(function (item) {
    return item[matchKey] === file[matchKey];
  })[0];
}
export function removeFileItem(file, fileList) {
  var matchKey = file.uid !== undefined ? 'uid' : 'name';
  var removed = fileList.filter(function (item) {
    return item[matchKey] !== file[matchKey];
  });

  if (removed.length === fileList.length) {
    return null;
  }

  return removed;
} // ==================== Default Image Preview ====================

var extname = function extname() {
  var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var temp = url.split('/');
  var filename = temp[temp.length - 1];
  var filenameWithoutSuffix = filename.split(/#|\?/)[0];
  return (/\.[^./\\]*$/.exec(filenameWithoutSuffix) || [''])[0];
};

var isImageFileType = function isImageFileType(type) {
  return type.indexOf('image/') === 0;
};

export var isImageUrl = function isImageUrl(file) {
  if (file.type && !file.thumbUrl) {
    return isImageFileType(file.type);
  }

  var url = file.thumbUrl || file.url;
  var extension = extname(url);

  if (/^data:image\//.test(url) || /(webp|svg|png|gif|jpg|jpeg|jfif|bmp|dpg|ico)$/i.test(extension)) {
    return true;
  }

  if (/^data:/.test(url)) {
    // other file types of base64
    return false;
  }

  if (extension) {
    // other file types which have extension
    return false;
  }

  return true;
};
var MEASURE_SIZE = 200;
export function previewImage(file) {
  return new Promise(function (resolve) {
    if (!file.type || !isImageFileType(file.type)) {
      resolve('');
      return;
    }

    var canvas = document.createElement('canvas');
    canvas.width = MEASURE_SIZE;
    canvas.height = MEASURE_SIZE;
    canvas.style.cssText = "position: fixed; left: 0; top: 0; width: ".concat(MEASURE_SIZE, "px; height: ").concat(MEASURE_SIZE, "px; z-index: 9999; display: none;");
    document.body.appendChild(canvas);
    var ctx = canvas.getContext('2d');
    var img = new Image();

    img.onload = function () {
      var width = img.width,
          height = img.height;
      var drawWidth = MEASURE_SIZE;
      var drawHeight = MEASURE_SIZE;
      var offsetX = 0;
      var offsetY = 0;

      if (width > height) {
        drawHeight = height * (MEASURE_SIZE / width);
        offsetY = -(drawHeight - drawWidth) / 2;
      } else {
        drawWidth = width * (MEASURE_SIZE / height);
        offsetX = -(drawWidth - drawHeight) / 2;
      }

      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
      var dataURL = canvas.toDataURL();
      document.body.removeChild(canvas);
      resolve(dataURL);
    };

    img.src = window.URL.createObjectURL(file);
  });
}