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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(require("react"));
var shallowequal_1 = __importDefault(require("shallowequal"));
var hoist_non_react_statics_1 = __importDefault(require("hoist-non-react-statics"));
var Provider_1 = require("./Provider");
function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}
var defaultMapStateToProps = function () { return ({}); };
function connect(mapStateToProps, options) {
    if (options === void 0) { options = {}; }
    var shouldSubscribe = !!mapStateToProps;
    var finalMapStateToProps = mapStateToProps || defaultMapStateToProps;
    return function wrapWithConnect(WrappedComponent) {
        var Connect = /** @class */ (function (_super) {
            __extends(Connect, _super);
            function Connect(props, context) {
                var _this = _super.call(this, props, context) || this;
                _this.unsubscribe = null;
                _this.handleChange = function () {
                    if (!_this.unsubscribe) {
                        return;
                    }
                    var nextState = finalMapStateToProps(_this.store.getState(), _this.props);
                    _this.setState({ subscribed: nextState });
                };
                _this.store = _this.context;
                _this.state = {
                    subscribed: finalMapStateToProps(_this.store.getState(), props),
                    store: _this.store,
                    props: props,
                };
                return _this;
            }
            Connect.getDerivedStateFromProps = function (props, prevState) {
                // using ownProps
                if (mapStateToProps && mapStateToProps.length === 2 && props !== prevState.props) {
                    return {
                        subscribed: finalMapStateToProps(prevState.store.getState(), props),
                        props: props,
                    };
                }
                return { props: props };
            };
            Connect.prototype.componentDidMount = function () {
                this.trySubscribe();
            };
            Connect.prototype.componentWillUnmount = function () {
                this.tryUnsubscribe();
            };
            Connect.prototype.shouldComponentUpdate = function (nextProps, nextState) {
                return (!shallowequal_1.default(this.props, nextProps) ||
                    !shallowequal_1.default(this.state.subscribed, nextState.subscribed));
            };
            Connect.prototype.trySubscribe = function () {
                if (shouldSubscribe) {
                    this.unsubscribe = this.store.subscribe(this.handleChange);
                    this.handleChange();
                }
            };
            Connect.prototype.tryUnsubscribe = function () {
                if (this.unsubscribe) {
                    this.unsubscribe();
                    this.unsubscribe = null;
                }
            };
            Connect.prototype.render = function () {
                var props = __assign(__assign(__assign({}, this.props), this.state.subscribed), { store: this.store });
                return React.createElement(WrappedComponent, __assign({}, props, { ref: this.props.miniStoreForwardedRef }));
            };
            Connect.displayName = "Connect(" + getDisplayName(WrappedComponent) + ")";
            Connect.contextType = Provider_1.MiniStoreContext;
            return Connect;
        }(React.Component));
        if (options.forwardRef) {
            var forwarded = React.forwardRef(function (props, ref) {
                return React.createElement(Connect, __assign({}, props, { miniStoreForwardedRef: ref }));
            });
            return hoist_non_react_statics_1.default(forwarded, WrappedComponent);
        }
        return hoist_non_react_statics_1.default(Connect, WrappedComponent);
    };
}
exports.connect = connect;
