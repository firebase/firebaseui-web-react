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

// React core.
import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';

// Firebase.
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, EmailAuthProvider } from 'firebase/auth';
import { StyledFirebaseAuth } from 'react-firebaseui';

// Styles
import styles from './app.css'; // This uses CSS modules.
import './firebaseui-styling.global.css'; // Import globally.

// Get the Firebase config from the auto generated file.
const firebaseConfig = require('./firebase-config.json').result.sdkConfig;

// Instantiate a Firebase app.
const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);

// Firebase UI config.
const uiConfig = {
  signInFlow: 'popup',
  signInOptions: [
    GoogleAuthProvider.PROVIDER_ID,
    EmailAuthProvider.PROVIDER_ID,
  ],
  callbacks: {
    signInSuccessWithAuthResult: () => false,
  },
};

/**
 * The Splash Page containing the login UI.
 */
const App = () => {
  const [isSignedIn, setIsSignedIn] = useState(undefined);

  useEffect(() => {
    // Listen for auth state changes.
    const unregisterAuthObserver = firebaseAuth.onAuthStateChanged((user) => {
      setIsSignedIn(!!user);
    });

    // Unregister the auth observer on unmount.
    return () => {
      unregisterAuthObserver();
    }
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <i className={styles.logoIcon + ' material-icons'}>photo</i> My App
      </div>
      <div className={styles.caption}>This is a cool demo app</div>
      {isSignedIn !== undefined && !isSignedIn &&
        <div>
          <StyledFirebaseAuth
            className={styles.firebaseUi}
            uiConfig={uiConfig}
            firebaseAuth={firebaseAuth}
          />
        </div>
      }
      {isSignedIn &&
        <div className={styles.signedIn}>
          Hello {firebaseAuth.currentUser.displayName}. You are now signed In!
          <a className={styles.button} onClick={() => firebaseAuth.signOut()}>Sign-out</a>
        </div>
      }
    </div>
  );
};

// Load the app in the browser.
const container = document.getElementById('app');
const root = createRoot(container);
root.render(<App />);
