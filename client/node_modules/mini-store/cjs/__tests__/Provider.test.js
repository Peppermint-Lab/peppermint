"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var enzyme_1 = require("enzyme");
var index_1 = require("../index");
var Provider_1 = require("../Provider");
test('store context', function (done) {
    var store = index_1.create({});
    var App = function () {
        var contextStore = react_1.useContext(Provider_1.MiniStoreContext);
        expect(contextStore).toBe(store);
        done();
        return react_1.default.createElement("div", null, "hello");
    };
    enzyme_1.mount(react_1.default.createElement(index_1.Provider, { store: store },
        react_1.default.createElement(App, null)));
});
