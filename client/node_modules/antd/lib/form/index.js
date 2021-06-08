"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Form = _interopRequireWildcard(require("./Form"));

var _FormItem = _interopRequireDefault(require("./FormItem"));

var _ErrorList = _interopRequireDefault(require("./ErrorList"));

var _FormList = _interopRequireDefault(require("./FormList"));

var _context = require("./context");

var _devWarning = _interopRequireDefault(require("../_util/devWarning"));

var Form = _Form["default"];
Form.Item = _FormItem["default"];
Form.List = _FormList["default"];
Form.ErrorList = _ErrorList["default"];
Form.useForm = _Form.useForm;
Form.Provider = _context.FormProvider;

Form.create = function () {
  (0, _devWarning["default"])(false, 'Form', 'antd v4 removed `Form.create`. Please remove or use `@ant-design/compatible` instead.');
};

var _default = Form;
exports["default"] = _default;