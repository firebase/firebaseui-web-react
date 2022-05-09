"use strict";

exports.__esModule = true;
exports.default = void 0;

var _react = require("react");

const FirebaseAuth = props => {
  const {
    uiConfig,
    firebaseAuth,
    className,
    uiCallback
  } = props;
  let element = React.createRef();
  (0, _react.useEffect)(() => {
    let userSignedIn = false;

    require('firebaseui/dist/firebaseui.css');

    const firebaseui = require('firebaseui');

    const firebaseUiWidget = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(firebaseAuth);

    if (uiConfig.signInFlow === 'popup') {
      firebaseUiWidget.reset();
    }

    const unregisterAuthObserver = onAuthStateChanged(firebaseAuth, user => {
      if (!user && userSignedIn) {
        firebaseUiWidget.reset();
      }

      userSignedIn = !!user;
    });

    if (uiCallback) {
      uiCallback(firebaseUiWidget);
    }

    firebaseUiWidget.start((void 0).element.current, (void 0).uiConfig);
    return () => {
      unregisterAuthObserver();
      firebaseUiWidget.reset();
    };
  }, [uiConfig]);
  return React.createElement("div", {
    className: className,
    ref: element
  });
};

var _default = FirebaseAuth;
exports.default = _default;
//# sourceMappingURL=FirebaseAuth.js.map