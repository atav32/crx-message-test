console.log('%c background', 'color: #bb0');

let extensionPort, externalPort;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('%c message', 'color: #0bb', request, `from ${sender.tab ? sender.tab.url : 'extension'}`);
  setTimeout(() => {
    sendResponse({
      answer: 'send message received',
      sender: 'background',
    });
  });

  // sending a new message
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, {
      prompt: 'respond send message to active tab',
      sender: 'background',
    });
  });

  // posting a port message
  if (extensionPort) {
    extensionPort.postMessage({
      prompt: 'send message received',
      origin: sender.tab,
      sender: 'background',
    });
  }

  return true; // async response
});

chrome.runtime.onMessageExternal.addListener((request, sender, sendResponse) => {
  console.log('%c web message', 'color: #0bb', request, `from ${sender.tab ? sender.tab.url : 'extension'}`);
  setTimeout(() => {
    sendResponse({
      answer: 'external send message received',
      sender: 'background',
    });
  });
});

chrome.runtime.onConnect.addListener((port) => {
  console.log('%c on connect', 'color: #b0b', port.name);
  extensionPort = port;
  port.onMessage.addListener((message) => {
    console.log('%c port message', 'color: #b0b', message);
    setTimeout(() => {
      port.postMessage({
        name: port.name,
        answer: 'post message received',
        sender: 'background',
      });
    });
  });
});

chrome.runtime.onConnectExternal.addListener((port) => {
  console.log('%c on connect external', 'color: #b0b', port.name);
  externalPort = port;
  port.onMessage.addListener((message) => {
    console.log('%c external port message', 'color: #b0b', message);
    setTimeout(() => {
      port.postMessage({
        name: port.name,
        answer: 'external post message received',
        sender: 'background',
      });
    });
  });
});
