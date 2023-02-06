import firebaseui from 'firebaseui';
import React from 'react';

interface Props {
  // The Firebase UI Web UI Config object.
  // See: https://github.com/firebase/firebaseui-web#configuration
  uiConfig: firebaseui.auth.Config;
  // Callback that will be passed the FirebaseUi instance before it is
  // started. This allows access to certain configuration options such as
  // disableAutoSignIn().
  uiCallback?(ui: firebaseui.auth.AuthUI): void;
  // The Firebase App auth instance to use.
  firebaseAuth: any; // As firebaseui-web
  className?: string;
}

export const StyledFirebaseAuth: React.FC<Props>;
export const FirebaseAuth: React.FC<Props>;
