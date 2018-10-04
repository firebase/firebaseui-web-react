'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ELEMENT_ID = 'firebaseui_container';

var firebaseUiDeletion = Promise.resolve();

var FirebaseAuth = function (_React$Component) {
  _inherits(FirebaseAuth, _React$Component);

  function FirebaseAuth(props) {
    _classCallCheck(this, FirebaseAuth);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.uiConfig = props.uiConfig;
    _this.firebaseAuth = props.firebaseAuth;
    _this.className = props.className;
    _this.uiCallback = props.uiCallback;
    _this.unregisterAuthObserver = function () {};
    return _this;
  }

  FirebaseAuth.prototype.componentDidMount = function componentDidMount() {
    var _this2 = this;

    require('firebaseui/dist/firebaseui.css');

    var firebaseui = require('firebaseui');

    return firebaseUiDeletion.then(function () {
      _this2.firebaseUiWidget = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(_this2.firebaseAuth);
      if (_this2.uiConfig.signInFlow === 'popup') {
        _this2.firebaseUiWidget.reset();
      }

      _this2.userSignedIn = false;
      _this2.unregisterAuthObserver = _this2.firebaseAuth.onAuthStateChanged(function (user) {
        if (!user && _this2.userSignedIn) {
          _this2.firebaseUiWidget.reset();
        }
        _this2.userSignedIn = !!user;
      });

      if (_this2.uiCallback) {
        _this2.uiCallback(_this2.firebaseUiWidget);
      }

      _this2.firebaseUiWidget.start('#' + ELEMENT_ID, _this2.uiConfig);
    });
  };

  FirebaseAuth.prototype.componentWillUnmount = function componentWillUnmount() {
    var _this3 = this;

    firebaseUiDeletion = firebaseUiDeletion.then(function () {
      _this3.unregisterAuthObserver();
      return _this3.firebaseUiWidget.delete();
    });
    return firebaseUiDeletion;
  };

  FirebaseAuth.prototype.render = function render() {
    return _react2.default.createElement('div', { className: this.className, id: ELEMENT_ID });
  };

  return FirebaseAuth;
}(_react2.default.Component);

exports.default = FirebaseAuth;
//# sourceMappingURL=FirebaseAuth.js.map