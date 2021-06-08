"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var enzyme_1 = require("enzyme");
var index_1 = require("../index");
var StatelessApp;
var Connected;
var store;
var wrapper;
var StatefulApp = /** @class */ (function (_super) {
    __extends(StatefulApp, _super);
    function StatefulApp() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StatefulApp.prototype.render = function () {
        return (react_1.default.createElement("div", null, this.props.msg));
    };
    return StatefulApp;
}(react_1.default.Component));
describe('stateless', function () {
    beforeEach(function () {
        StatelessApp = function (_a) {
            var msg = _a.msg;
            return react_1.default.createElement("div", null, msg);
        };
        Connected = index_1.connect(function (state) { return state; })(StatelessApp);
        store = index_1.create({ msg: 'hello', count: 0 });
        wrapper = enzyme_1.mount(react_1.default.createElement(index_1.Provider, { store: store },
            react_1.default.createElement(Connected, null)));
    });
    test('map state to props', function () {
        expect(wrapper.text()).toBe('hello');
    });
    test('renrender as subscribed state changes', function () {
        store.setState({ msg: 'halo' });
        expect(wrapper.text()).toBe('halo');
    });
    test('on rerender when unsubscribed state changes', function () {
        store.setState({ count: 1 });
        expect(wrapper.text()).toBe('hello');
    });
    test('do not subscribe', function () {
        Connected = index_1.connect()(StatelessApp);
        wrapper = enzyme_1.mount(react_1.default.createElement(index_1.Provider, { store: store },
            react_1.default.createElement(Connected, { msg: "hello" })));
        expect(wrapper.instance().unsubscribe).toBeUndefined();
    });
    test('pass own props to mapStateToProps', function () {
        Connected = index_1.connect(function (state, props) { return ({
            msg: state.msg + " " + props.name
        }); })(StatelessApp);
        wrapper = enzyme_1.mount(react_1.default.createElement(index_1.Provider, { store: store },
            react_1.default.createElement(Connected, { name: "world" })));
        expect(wrapper.text()).toBe('hello world');
    });
    test('mapStateToProps is invoked when own props changes', function () {
        Connected = index_1.connect(function (state, props) { return ({
            msg: state.msg + " " + props.name
        }); })(StatelessApp);
        var App = /** @class */ (function (_super) {
            __extends(App, _super);
            function App() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.state = {
                    name: 'world'
                };
                return _this;
            }
            App.prototype.render = function () {
                var _this = this;
                return (react_1.default.createElement("div", null,
                    react_1.default.createElement("button", { onClick: function () { return _this.setState({ name: 'there' }); } }, "Click"),
                    react_1.default.createElement(Connected, { name: this.state.name })));
            };
            return App;
        }(react_1.default.Component));
        wrapper = enzyme_1.mount(react_1.default.createElement(index_1.Provider, { store: store },
            react_1.default.createElement(App, null)));
        wrapper.find('button').simulate('click');
        expect(wrapper.find(Connected).text()).toBe('hello there');
    });
    test('mapStateToProps is not invoked when own props is not used', function () {
        var mapStateToProps = jest.fn(function (state) { return ({ msg: state.msg }); });
        Connected = index_1.connect(mapStateToProps)(StatelessApp);
        var App = /** @class */ (function (_super) {
            __extends(App, _super);
            function App() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.state = {
                    name: 'world'
                };
                return _this;
            }
            App.prototype.render = function () {
                var _this = this;
                return (react_1.default.createElement("div", null,
                    react_1.default.createElement("button", { onClick: function () { return _this.setState({ name: 'there' }); } }, "Click"),
                    react_1.default.createElement(Connected, { name: this.state.name })));
            };
            return App;
        }(react_1.default.Component));
        wrapper = enzyme_1.mount(react_1.default.createElement(index_1.Provider, { store: store },
            react_1.default.createElement(App, null)));
        wrapper.find('button').simulate('click');
        expect(mapStateToProps).toHaveBeenCalledTimes(2);
    });
    // https://github.com/ant-design/ant-design/issues/11723
    test('rerender component when props changes', function () {
        var Dummy = function (_a) {
            var visible = _a.visible;
            return react_1.default.createElement("div", null, visible && 'hello');
        };
        Connected = index_1.connect(function (state, props) { return ({
            visible: state.visible === false ? props.ownVisible : state.visible
        }); })(Dummy);
        var App = /** @class */ (function (_super) {
            __extends(App, _super);
            function App() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.state = {
                    visible: true,
                };
                return _this;
            }
            App.prototype.render = function () {
                var _this = this;
                return (react_1.default.createElement("div", null,
                    react_1.default.createElement("button", { onClick: function () { return _this.setState({ visible: false }); } }, "Click"),
                    react_1.default.createElement(Connected, { ownVisible: this.state.visible })));
            };
            return App;
        }(react_1.default.Component));
        store = index_1.create({ visible: false });
        wrapper = enzyme_1.mount(react_1.default.createElement(index_1.Provider, { store: store },
            react_1.default.createElement(App, null)));
        wrapper.find('button').simulate('click');
        expect(wrapper.find(Dummy).text()).toBe('');
        store.setState({ visible: true });
        wrapper.update();
        expect(wrapper.find(Dummy).text()).toBe('hello');
    });
});
describe('stateful', function () {
    beforeEach(function () {
        Connected = index_1.connect(function (state) { return state; })(StatefulApp);
        store = index_1.create({ msg: 'hello', count: 0 });
        wrapper = enzyme_1.mount(react_1.default.createElement(index_1.Provider, { store: store },
            react_1.default.createElement(Connected, null)));
    });
});
