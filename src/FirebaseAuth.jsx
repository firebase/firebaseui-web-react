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

import React from 'react';

// Global ID for the element.
const ELEMENT_ID = 'firebaseui_container';

// Promise that resolves unless the FirebaseUI instance is currently being deleted.
let firebaseUiDeletion = Promise.resolve();

/**
 * React Component wrapper for the FirebaseUI Auth widget.
 */
export default class FirebaseAuth extends React.Component {
  /**
   * Constructor  Firebase Auth UI component
   *
   * @param {Object} props - Additional object properties.
   * @constructor
   */
  constructor(props) {
    super(props);

    this.uiConfig = props.uiConfig;
    this.firebaseAuth = props.firebaseAuth;
    this.className = props.className;
    this.uiCallback = props.uiCallback;
    this.unregisterAuthObserver = () => {};
  }

  /**
   * @inheritDoc
   */
  componentDidMount() {
    // Import the css only on the client.
    require('firebaseui/dist/firebaseui.css');

    // Firebase UI only works on the Client. So we're loading the package in `componentDidMount`
    // So that this works when doing server-side rendering.
    const firebaseui = require('firebaseui');

    // Wait in case the firebase UI instance is being deleted.
    // This can happen if you unmount/remount the element quickly.
    return firebaseUiDeletion.then(() => {
      // Get or Create a firebaseUI instance.
      this.firebaseUiWidget = firebaseui.auth.AuthUI.getInstance()
           || new firebaseui.auth.AuthUI(this.firebaseAuth);
      if (this.uiConfig.signInFlow === 'popup') {
        this.firebaseUiWidget.reset();
      }

      // We track the auth state to reset firebaseUi if the user signs out.
      this.userSignedIn = false;
      this.unregisterAuthObserver = this.firebaseAuth.onAuthStateChanged((user) => {
        if (!user && this.userSignedIn) {
          this.firebaseUiWidget.reset();
        }
        this.userSignedIn = !!user;
      });

      // Trigger the callback if any was set.
      if (this.uiCallback) {
        this.uiCallback(this.firebaseUiWidget);
      }

      // Render the firebaseUi Widget.
      this.firebaseUiWidget.start('#' + ELEMENT_ID, this.uiConfig);
    });
  }

  /**
   * @inheritDoc
   */
  componentWillUnmount() {
    firebaseUiDeletion = firebaseUiDeletion.then(() => {
      this.unregisterAuthObserver();
      return this.firebaseUiWidget.delete();
    });
    return firebaseUiDeletion;
  }

  /**
   * Properties types.
   */
  props: {
    // The Firebase UI Web UI Config object.
    // See: https://github.com/firebase/firebaseui-web#configuration
    uiConfig: Object,
    // The Firebase App auth instance to use.
    firebaseAuth: Object,
    // Callback that will be passed the FirebaseUi instance before it is
    // started. This allows access to certain configuration options such as
    // disableAutoSignIn().
    uiCallback?: Function,
    className?: String,
  };

  /**
   * @inheritDoc
   */
  render() {
    return (
      <div className={this.className} id={ELEMENT_ID}/>
    );
  }
}
