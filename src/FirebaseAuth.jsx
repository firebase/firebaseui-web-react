/**
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
// @flow

import { useEffect } from 'react';

/**
 * React wrapper for the FirebaseUI Auth widget.
 */
const FirebaseAuth = (props) => {
  const {
    uiConfig,
    firebaseAuth,
    className,
    uiCallback,
  } = props;

  let element = React.createRef();

  useEffect(() => {
    let userSignedIn = false;

    // Import the css only on the client.
    require('firebaseui/dist/firebaseui.css');

    // Firebase UI only works on the Client. So we're loading the package in `useEffect`
    // So that this works when doing server-side rendering.
    const firebaseui = require('firebaseui');
  
    // Get or Create a firebaseUI instance.
    const firebaseUiWidget =
      firebaseui.auth.AuthUI.getInstance() ||
      new firebaseui.auth.AuthUI(firebaseAuth);
  
    if (uiConfig.signInFlow === 'popup') {
      firebaseUiWidget.reset();
    }

    // We track the auth state to reset firebaseUi if the user signs out.
    const unregisterAuthObserver = onAuthStateChanged(firebaseAuth, (user) => {
      if (!user && userSignedIn) {
        firebaseUiWidget.reset();
      }
      userSignedIn = !!user;
    });

    // Trigger the callback if any was set.
    if (uiCallback) {
      uiCallback(firebaseUiWidget);
    }

    // Render the firebaseUi Widget.
    firebaseUiWidget.start(this.element.current, this.uiConfig);
  
    return () => {
      unregisterAuthObserver();
      firebaseUiWidget.reset();
    };
  }, [uiConfig]);

  return (
    <div className={className} ref={element} />
  );
};

export default FirebaseAuth;
