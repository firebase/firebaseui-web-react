'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright 2017 Google Inc. All Rights Reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Licensed under the Apache License, Version 2.0 (the "License");
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * you may not use this file except in compliance with the License.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * You may obtain a copy of the License at
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *      http://www.apache.org/licenses/LICENSE-2.0
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Unless required by applicable law or agreed to in writing, software
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * distributed under the License is distributed on an "AS IS" BASIS,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * See the License for the specific language governing permissions and
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * limitations under the License.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


// Global ID for the element.
var ELEMENT_ID = 'firebaseui_container';

/**
 * React Component wrapper for the FirebaseUI Auth widget.
 */

var FirebaseAuth = function (_React$Component) {
  _inherits(FirebaseAuth, _React$Component);

  /**
   * Constructor  Firebase Auth UI component
   *
   * @param {Object} props - Additional object properties.
   * @constructor
   */
  function FirebaseAuth(props) {
    _classCallCheck(this, FirebaseAuth);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.uiConfig = props.uiConfig;
    _this.firebaseAuth = props.firebaseAuth;
    _this.elementId = props.elementId || ELEMENT_ID;
    return _this;
  }

  /**
   * @inheritDoc
   */


  FirebaseAuth.prototype.componentDidMount = function componentDidMount() {
    // Import the css only on the client.
    require('firebaseui/dist/firebaseui.css');

    // Firebase UI only works on the Client. So we're loading in `componentDidMount`.
    var firebaseui = require('firebaseui');
    this.firebaseUiWidget = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(this.firebaseAuth);
    this.firebaseUiWidget.reset();
    this.firebaseUiWidget.start('#' + this.elementId, this.uiConfig);
  };

  /**
   * @inheritDoc
   */


  FirebaseAuth.prototype.componentWillUnmount = function componentWillUnmount() {
    this.firebaseUiWidget.reset();
  };

  /**
   * Properties types.
   */


  /**
   * @inheritDoc
   */
  FirebaseAuth.prototype.render = function render() {
    return _react2.default.createElement('div', { id: this.elementId });
  };

  return FirebaseAuth;
}(_react2.default.Component);

exports.default = FirebaseAuth;
//# sourceMappingURL=FirebaseAuth.js.map