## [Chrome Extension Messaging API](https://developer.chrome.com/extensions/messaging) has *awful* documentation
The big offender is the error message. That's right. Singular.

Depending on the bug, you either get silence or simply:

```
Unchecked runtime.lastError: Could not establish connection. Receiving end does not exist.
```

Nothing specific. No line numbers either.

So there's a heavy burden on the developer to internalize all the possible error cases of the API.

Time to get our hands dirty with some advanced use-cases.

### Lessons
- Prefer `port.postMessage()` over `runtime.sendMessage()`
  - you have more control over the lifetime of ports (won't get randomly garbage collected as long as you hold a reference to it)
  - you can be notified when a port is disconnected
  - port names help avoid message crosstalk
  - you can't open and listen to the same port in the same frame (i.e. can't open a port with yourself), which helps prevent an anti-pattern of messaging overuse
  - if more than one listener is registered with the same port name, only the last listener registered handles the event
- `sendMessage()` will call the response callback automatically (even if none is supplied) and pass in `undefined`
- External page/app cannot listen for messages, only send
- Avoid race conditions by manually injecting the content script, instead of relying on the manifest file

### Resources
- https://developer.chrome.com/apps/runtime#method-sendMessage
- https://developer.chrome.com/apps/manifest/externally_connectable

-----

### Install

1. Run `npm i`
2. Run `npm start`
3. Open Chrome and go to [chrome://extensions](chrome://extensions)
  - Or click *Settings* > *More Tools* > *Extensions*
4. Enable Developer Mode in Chrome
5. Click-&-drag the crx/ directory into the Chrome Extensions page

-----

*This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).*

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
