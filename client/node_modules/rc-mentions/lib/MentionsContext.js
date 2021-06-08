"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MentionsContextConsumer = exports.MentionsContextProvider = void 0;

var React = _interopRequireWildcard(require("react"));

/* tslint:disable: no-object-literal-type-assertion */
// We will never use default, here only to fix TypeScript warning
var MentionsContext = /*#__PURE__*/React.createContext(null);
var MentionsContextProvider = MentionsContext.Provider;
exports.MentionsContextProvider = MentionsContextProvider;
var MentionsContextConsumer = MentionsContext.Consumer;
exports.MentionsContextConsumer = MentionsContextConsumer;