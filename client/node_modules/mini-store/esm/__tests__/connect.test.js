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
import React from 'react';
import { mount } from 'enzyme';
import { create, Provider, connect } from '../index';
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
        return (React.createElement("div", null, this.props.msg));
    };
    return StatefulApp;
}(React.Component));
describe('stateless', function () {
    beforeEach(function () {
        StatelessApp = function (_a) {
            var msg = _a.msg;
            return React.createElement("div", null, msg);
        };
        Connected = connect(function (state) { return state; })(StatelessApp);
        store = create({ msg: 'hello', count: 0 });
        wrapper = mount(React.createElement(Provider, { store: store },
            React.createElement(Connected, null)));
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
        Connected = connect()(StatelessApp);
        wrapper = mount(React.createElement(Provider, { store: store },
            React.createElement(Connected, { msg: "hello" })));
        expect(wrapper.instance().unsubscribe).toBeUndefined();
    });
    test('pass own props to mapStateToProps', function () {
        Connected = connect(function (state, props) { return ({
            msg: state.msg + " " + props.name
        }); })(StatelessApp);
        wrapper = mount(React.createElement(Provider, { store: store },
            React.createElement(Connected, { name: "world" })));
        expect(wrapper.text()).toBe('hello world');
    });
    test('mapStateToProps is invoked when own props changes', function () {
        Connected = connect(function (state, props) { return ({
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
                return (React.createElement("div", null,
                    React.createElement("button", { onClick: function () { return _this.setState({ name: 'there' }); } }, "Click"),
                    React.createElement(Connected, { name: this.state.name })));
            };
            return App;
        }(React.Component));
        wrapper = mount(React.createElement(Provider, { store: store },
            React.createElement(App, null)));
        wrapper.find('button').simulate('click');
        expect(wrapper.find(Connected).text()).toBe('hello there');
    });
    test('mapStateToProps is not invoked when own props is not used', function () {
        var mapStateToProps = jest.fn(function (state) { return ({ msg: state.msg }); });
        Connected = connect(mapStateToProps)(StatelessApp);
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
                return (React.createElement("div", null,
                    React.createElement("button", { onClick: function () { return _this.setState({ name: 'there' }); } }, "Click"),
                    React.createElement(Connected, { name: this.state.name })));
            };
            return App;
        }(React.Component));
        wrapper = mount(React.createElement(Provider, { store: store },
            React.createElement(App, null)));
        wrapper.find('button').simulate('click');
        expect(mapStateToProps).toHaveBeenCalledTimes(2);
    });
    // https://github.com/ant-design/ant-design/issues/11723
    test('rerender component when props changes', function () {
        var Dummy = function (_a) {
            var visible = _a.visible;
            return React.createElement("div", null, visible && 'hello');
        };
        Connected = connect(function (state, props) { return ({
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
                return (React.createElement("div", null,
                    React.createElement("button", { onClick: function () { return _this.setState({ visible: false }); } }, "Click"),
                    React.createElement(Connected, { ownVisible: this.state.visible })));
            };
            return App;
        }(React.Component));
        store = create({ visible: false });
        wrapper = mount(React.createElement(Provider, { store: store },
            React.createElement(App, null)));
        wrapper.find('button').simulate('click');
        expect(wrapper.find(Dummy).text()).toBe('');
        store.setState({ visible: true });
        wrapper.update();
        expect(wrapper.find(Dummy).text()).toBe('hello');
    });
});
describe('stateful', function () {
    beforeEach(function () {
        Connected = connect(function (state) { return state; })(StatefulApp);
        store = create({ msg: 'hello', count: 0 });
        wrapper = mount(React.createElement(Provider, { store: store },
            React.createElement(Connected, null)));
    });
});
