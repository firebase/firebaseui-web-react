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

import React, { useEffect, useRef, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';

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

  const [firebaseui, setFirebaseui] = useState(null);
  const [userSignedIn, setUserSignedIn] = useState(false);

  const elementRef = useRef(null);

  useEffect(() => {
    // Firebase UI only works on the Client. So we're loading the package only after
    // the component has mounted, so that this works when doing server-side rendering.
    setFirebaseui(require('firebaseui'));
  }, []);

  useEffect(() => {
    if (firebaseui === null) {
      return;
    }

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
      setUserSignedIn(!!user);
    });

    // Trigger the callback if any was set.
    if (uiCallback) {
      uiCallback(firebaseUiWidget);
    }

    // Render the firebaseUi Widget.
    firebaseUiWidget.start(elementRef.current, uiConfig);

    return () => {
      unregisterAuthObserver();
      firebaseUiWidget.reset();
    };
  }, [firebaseui, uiConfig]);

  if (firebaseui !== null) {
    // Import the css only on the client.
    require('firebaseui/dist/firebaseui.css');
  }

  return (
    <div className={className} ref={elementRef} />
  );
};

export default FirebaseAuth;
