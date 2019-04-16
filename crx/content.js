console.log('%c content', 'color: #bb0');

const messageContainer = document.querySelector('.App-response-section .App-response-json');

const port = chrome.runtime.connect({ name: 'content' });
port.onMessage.addListener((message) => {
  console.log('%c content port message', 'color: #b0b', message);
  if (messageContainer) {
    messageContainer.innerText = JSON.stringify(message, null, 2);
  }
});

const sendMessageButton = document.querySelector('.App-content-section .send-message-button');
if (sendMessageButton) {
  sendMessageButton.addEventListener('click', (event) => {
    chrome.runtime.sendMessage({
      action: 'content'
    }, (response) => {
      console.log('%c content send message response', 'color: #0bb', response);
      if (messageContainer) {
        messageContainer.innerText = JSON.stringify(response, null, 2);
      }
    });
  });
}

const postMessageButton = document.querySelector('.App-content-section .post-message-button');
if (postMessageButton) {
  postMessageButton.addEventListener('click', (event) => {
    port.postMessage({
      prompt: 'content'
    });
  });
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('%c message listener 1', 'color: #0bb', request, `from ${sender.tab ? sender.tab.url : 'extension'}`);
  setTimeout(() => {
    sendResponse({
      answer: 'send message received',
      source: 'content',
    });
  });
  return true; // async response
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('%c message listener 2', 'color: #0bb', request, `from ${sender.tab ? sender.tab.url : 'extension'}`);
  setTimeout(() => {
    sendResponse({
      answer: 'send message received',
      source: 'content',
    });
  });
  return true; // async response
});
