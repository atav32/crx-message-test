console.log('%c hot reload', 'color: #0bb');

/* hot reload for when the Chrome extension changes – speeds up dev */
(function hotReload() {
  const filesInDirectory = (dir) => new Promise(resolve =>
    dir.createReader().readEntries(entries =>
      Promise.all(entries.filter(entry => entry.name[0] !== '.').map(entry =>
        entry.isDirectory ? filesInDirectory(entry) : new Promise(resolve => entry.file(resolve))
      ))
      .then(files => [].concat(...files))
      .then(resolve)
    )
  );

  const timestampForFilesInDirectory = (dir) =>
    filesInDirectory(dir).then(files => {
      try {
        return files.map(file => file.name + file.lastModifiedDate).join()
      } catch(e) {
        return '';
      }
    });

  const reload = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      const currentTab = tabs[0];
      // only reload on the demo tab
      if(currentTab && currentTab.url.includes('localhost')) {
        chrome.tabs.reload(tabs[0].id)
      }
      setTimeout(() => chrome.runtime.reload(), 0);
    });
  };

  const watchChanges = (dir, lastTimestamp) => {
    timestampForFilesInDirectory(dir).then(timestamp => {
      if(!lastTimestamp || (lastTimestamp === timestamp)) {
        setTimeout(() => watchChanges(dir, timestamp), 1000); // retry after 1s
      } else {
        reload()
      }
    })
  };

  chrome.runtime.getPackageDirectoryEntry((dir) => watchChanges(dir));
})();
