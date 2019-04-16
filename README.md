## Exploring how Chrome Extension messaging *actually* works

Because, honestly, the [official documentation](https://developer.chrome.com/extensions/messaging) is inadequate. Time to get our hands dirty.

### Lessons
- Prefer `port.postMessage()` over `runtime.sendMessage()`
- `sendMessage()` will call the response callback automatically (even if none is supplied) and pass in `undefined`
- External page cannot listen to messages, only send
- to avoid race conditions, manually inject the content script, instead of relying on the manifest file

### Resources
- https://developer.chrome.com/apps/runtime#method-sendMessage
- https://developer.chrome.com/apps/manifest/externally_connectable

-----

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Available Scripts

In the project directory, you can run:

#### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

#### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.
