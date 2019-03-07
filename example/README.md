# Firebase UI React - Example app

This is a sample app showing a usage of the react-firebaseui package in a react app using Webpack and CSS modules.


## Initial setup, building and serving.

1. Create a Firebase project using the [Firebase console](https://console.firebase.google.com).
1. In the **Authentication** section of your project's Firebase console, open the **Sign-In Method** tab and enable the **Google** and the **Email/Password** sign-in providers.
1. Install the run-time and build dependencies:
    ```bash
    npm install
    ```
1. Install the [Firebase CLI](https://firebase.google.com/docs/cli/):
    ```bash
    npm install -g firebase-tools
    ```
1. Tell Firebase to use your new project locally:
    ```bash
    firebase use --add
    ```
1. Run the build script to transpile and pack the sources:
    ```bash
    npm run build
    ```
1. Serve the app locally:
    ```bash
    npm run serve
    ```
1. Try out the app by opening [http://localhost:5000](http://localhost:5000) in your browser.



## Contributing

We'd love that you contribute to the project. Before doing so please read our [Contributor guide](../CONTRIBUTING.md).


## License

© Google, 2011. Licensed under an [Apache-2](../LICENSE) license.
