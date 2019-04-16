console.log('%c popup', 'color: #bb0');

const messageContainer = document.querySelector('.message-container');

const port = chrome.runtime.connect({ name: 'popup' });
port.onMessage.addListener((message) => {
  console.log('%c popup port message', 'color: #b0b', message);
  if (messageContainer) {
    messageContainer.innerText = JSON.stringify(message, null, 2);
  }
});

const sendMessageButton = document.querySelector('.send-message-button');
if (sendMessageButton) {
  sendMessageButton.addEventListener('click', (event) => {
    chrome.runtime.sendMessage({
      action: 'popup'
    }, (response) => {
      console.log('%c popup send message response', 'color: #0bb', response);
      if (messageContainer) {
        messageContainer.innerText = JSON.stringify(response, null, 2);
      }
    });
  });
}

const postMessageButton = document.querySelector('.post-message-button');
if (postMessageButton) {
  postMessageButton.addEventListener('click', (event) => {
    port.postMessage({
      prompt: 'popup'
    });
  });
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('%c message', 'color: #0bb', request, `from ${sender.tab ? sender.tab.url : 'extension'}`);
  setTimeout(() => {
    sendResponse({
      answer: 'send message received',
      source: 'popup',
    });
  });
  return true; // async response
});
