import * as firebaseui from 'firebaseui';
import * as React from 'react';

export interface Props {
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

export class StyledFirebaseAuth extends React.Component<Props> {}
export class FirebaseAuth extends React.Component<Props> {}
