console.log('%c content', 'color: #0bb');

const messageContainer = document.querySelector('.App-response-section');

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
      console.log('%c content send message response', 'color: #b0b', response);
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
