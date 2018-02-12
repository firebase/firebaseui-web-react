# FirebaseUI React Components

FirebaseUI React Components provides React Wrappers on top of the [Firebase UI Web library](https://github.com/firebase/firebaseui-web/) and notably Firebase UI Auth.

FirebaseUI Auth provides a drop-in auth solution that handles the UI flows for signing in users with email addresses and passwords, and Identity Provider Sign In using Google, Facebook and others. It is built on top of Firebase Auth.


## Installation and Usage

> For an example on how to use the FirebaseAuth react component have a look at the [example](./example) folder.

Install the npm package in your React app:

```bash
npm install --save react-firebaseui
```

You also need the `firebase` package installed which is a peer dependency:

```bash
npm install --save firebase
```

In your app:
  1. Import the `FirebaseAuth` or the `StyledFirebaseAuth` component from `react-firebaseui` and import `firebase`.
  2. Configure Firebase as described in [the Firebase Docs](https://firebase.google.com/docs/web/setup).
  3. Write a Firebase UI configuration as described in [firebase/firebaseui-web](https://github.com/firebase/firebaseui-web#configuration).
  4. Use the `FirebaseAuth` component in your template passing it the **Firebase UI configuration** and a **Firebase Auth instance**.


### `FirebaseAuth` vs `StyledFirebaseAuth`

There are two components that allow you to add FirebaseUI auth to your application: `FirebaseAuth` and `StyledFirebaseAuth`. The difference is that `FirebaseAuth` has a reference to the Firebase UI CSS (it `requires` the CSS) whereas `StyledFirebaseAuth` includes the CSS directly in its built. For simplicity you should use `StyledFirebaseAuth` and for better performances and build sizes you should use `FirebaseAuth`. `FirebaseAuth` is meant to be used with a CSS/style loader as part of yor webpack built configuration. See the [Packing your app](#packing-your-app) section


### Using `StyledFirebaseAuth` with a redirect

Below is an example on how to use `FirebaseAuth` with a redirect upon sign-in:

```js
// Import FirebaseAuth and firebase.
import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';

// Configure Firebase.
const config = {
  apiKey: 'AIzaSyAeue-AsYu76MMQlTOM-KlbYBlusW9c1FM',
  authDomain: 'myproject-1234.firebaseapp.com',
  // ...
};
firebase.initializeApp(config);

// Configure FirebaseUI.
const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'popup',
  // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
  signInSuccessUrl: '/signedIn',
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID
  ]
};

class SignInScreen extends React.Component {
  render() {
    return (
      <div>
        <h1>My App</h1>
        <p>Please sign-in:</p>
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>
      </div>
    );
  }
}
```

### Using `FirebaseAuth` with local state.

Below is an example on how to use `FirebaseAuth` with a state change upon sign-in:

```js
// Import FirebaseAuth and firebase.
import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';

// Configure Firebase.
const config = {
  apiKey: 'AIzaSyAeue-AsYu76MMQlTOM-KlbYBlusW9c1FM',
  authDomain: 'myproject-1234.firebaseapp.com',
  // ...
};
firebase.initializeApp(config);

class SignInScreen extends React.Component {
  
  state = {
    signedIn: false // Local signed-in state.
  };
  
  // Configure FirebaseUI.
  uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    // We will display Google and Facebook as auth providers.
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID
    ],
    // Avoid redirects after sign-in.
    callbacks: {
      signInSuccess: () => false
    }
  };

  // Listen to the Firebase Auth state and set the local state.
  componentWillMount() {
    firebase.auth().onAuthStateChanged((user) => {
      this.setState({signedIn: !!user});
    });
  }
  
  render() {
    if (!this.state.signedIn) {
      return (
        <div>
          <h1>My App</h1>
          <p>Please sign-in:</p>
          <StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()}/>
        </div>
      );
    }
    return (
      <div>
        <h1>My App</h1>
        <p>Welcome {firebase.auth().currentUser.displayName}! You are now signed-in!</p>
        <a onClick={() => firebase.auth().signOut()}>Sign-out</a>
      </div>
    );
  }
}
```

### Accessing the FirebaseUI instance

To allow for further configuration you can access the firebaseUI instance before it is started.
To do this you can pass a `uiCallback` callback function that wil be passed the Firebase UI instance. For example here is how to enable the `disableAutoSignIn()` option:

```js
// ...

render() {
  return (
    <div>
      <h1>My App</h1>
      <p>Please sign-in:</p>
      <StyledFirebaseAuth uiCallback={ui => ui.disableAutoSignIn()} uiConfig={this.uiConfig} firebaseAuth={firebase.auth()}/>
    </div>
  );
}
```


## Packing your app

If you are using the `StyledFirebaseAuth` component there should not be special configuration needed to package your app since the CSS is already included within the component. if you would like to extract the CSS you should use the `FirebaseAuth` component instead.

The `FirebaseAuth` needs a global CSS to get proper styling. The CSS is already imported within `FirebaseAuth`.
If you are using webpack you'll need to add [CSS loaders](https://github.com/webpack-contrib/css-loader):

```js
{
  module: {
    rules: [
      {
        test: /\.css/,
        use: [ 'style-loader', 'css-loader' ]
      }
    ]
  }
}
```

PS: make sure your rule does not exclude `/node_modules/` as this is where the library, and therefore, the CSS is located.

### With ExtractTextPlugin

If you are using [`ExtractTextPlugin`](https://github.com/webpack-contrib/extract-text-webpack-plugin) to extract a CSS file from the required CSS files you would typically use:

```js
{
  plugins: [new ExtractTextPlugin('./bundle.css')],
  module: {
    rules: [
      {
        test: /\.css/,
        loader: ExtractTextPlugin.extract(
          {
            fallback: 'style-loader',
            use: ['css-loader']
          })
      }
    ]
  }
}
```

PS: make sure your rule does not exclude `/node_modules/` as this is where the library, and therefore, the CSS is located.

### With ExtractTextPlugin and CSS modules

If you are using CSS modules in your app you need to handle the CSS files in `/node_modules/` in a separate loader so that they are imported as global CSS files and not modules. Your setup could look like:

```js
{
  plugins: [new ExtractTextPlugin('./bundle.css')],
  module: {
    rules: [
      // CSS loaders for CSS modules in your project. We exclude CSS files in ./node_modules
      {
        test: /\.css$/,
        exclude: [/\.global\./, /node_modules/],
        loader: ExtractTextPlugin.extract(
          {
            fallback: 'style-loader',
            use:[
              {
                loader: 'css-loader',
                options: {
                  importLoaders: 1,
                  modules: true,
                  autoprefixer: true,
                  minimize: true,
                  localIdentName: '[name]__[local]___[hash:base64:5]'
                }
              }
            ]
          })
      },

      // CSS loaders for global CSS files which includes files in ./node_modules
      {
        test: /\.css/,
        include: [/\.global\./, /node_modules/],
        loader: ExtractTextPlugin.extract(
          {
            fallback: 'style-loader',
            use: ['css-loader']
          })
      }
    ]
  }
}
```

## Styling 
 
To change the styling of the `FirebaseAuth` or the `StyledFirebaseAuth` widget you can override some of its CSS. To do this, import a CSS that will be included in your packed application. For instance create a `firebaseui-styling.global.css` file and import it in your app:

```js
import './firebaseui-styling.global.css'; // Import globally. Not with CSS modules.
```

> Note: If you are using the [With ExtractTextPlugin and CSS modules](#with-extracttextplugin-and-css-modules) Webpack build rule above, the `.global.css` suffix will make sure the CSS file is imported globally and not ran through modules support.

If you would like to see an example of styling, have a look at the [example app](./example).

Alternatively you can include the styling in a `<style>` tag in your application's markup.


## Contributing

We'd love that you contribute to the project. Before doing so please read our [Contributor guide](CONTRIBUTING.md).


## License

© Google, 2011. Licensed under an [Apache-2](LICENSE) license.
