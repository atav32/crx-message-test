console.log('%c background', 'color: #0bb');

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('%c message', 'color: #b0b', request, `from ${sender.tab ? sender.tab.url : 'extension'}`);
  sendResponse({
    answer: 'send message received',
  });
});

chrome.runtime.onConnect.addListener((port) => {
  console.log('%c on connect', 'color: #b0b', port.name);
  port.onMessage.addListener((message) => {
    console.log('%c port message', 'color: #b0b', message);
    port.postMessage({
      name: port.name,
      answer: 'post message received',
    });
  });
});
