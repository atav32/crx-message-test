console.log('%c background', 'color: #bb0');

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('%c message', 'color: #0bb', request, `from ${sender.tab ? sender.tab.url : 'extension'}`);
  sendResponse({
    answer: 'send message received',
    sender: 'background',
  });
});

chrome.runtime.onConnect.addListener((port) => {
  console.log('%c on connect', 'color: #b0b', port.name);
  port.onMessage.addListener((message) => {
    console.log('%c port message', 'color: #b0b', message);
    port.postMessage({
      name: port.name,
      answer: 'post message received',
      sender: 'background',
    });
  });
});
