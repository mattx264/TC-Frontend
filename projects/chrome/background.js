var isInit = false;
chrome.browserAction.onClicked.addListener(function (tab) {
  chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
    try {
      var tabId = tabs[0].id;

      chrome.windows.create({
        url: chrome.runtime.getURL("/index.html?id=" + tabId),
        type: "popup"
      }, function (win) {
        // win represents the Window object from windows API
        // Do something after opening
      });
    } catch (err) {
      console.log("ERROR " + err);
    }
    // if (isInit === true) {
    //   return;
    // }
    isInit = true;
    chrome.contextMenus.create({
      id: "test-element",
      title: "Test Element",
      contexts: ["all"]
    });

    chrome.extension.onConnect.addListener(function (port) {
      const networkFilters = {
        urls: ["<all_urls>"]
      };
      function sendPortMessage(obj) {
        try {
          port.postMessage(obj);
        } catch (err) {
          console.log("ERRROR" + err)
        }
      }
      chrome.webRequest.onBeforeSendHeaders.addListener(function (details) {
        if (details.type === "xmlhttprequest") {
          //console.log(details);
          //details.url;
          // details.method
          sendPortMessage({ type: 'xhrStart', data: details });
        }

      }, networkFilters, ['requestHeaders', 'blocking']);

      chrome.webRequest.onCompleted.addListener(function (details) {
        console.log(details);
        if (details.type === "xmlhttprequest") {
          //console.log(details);
          //details.url;
          // details.method
          sendPortMessage({ type: 'xhrDone', data: details });
        }
      }, networkFilters);


      port.onDisconnect.addListener(function (data) {
        console.log("Is onDisconnect");
      });

      var clickedEl = null;

      document.addEventListener("click", function (event) {
        //right click
        if (event.button == 2) {
          clickedEl = event.target;
        }
      }, true);
      chrome.contextMenus.onClicked.addListener(function (info, tab) {
        if (info.menuItemId == "test-element") {
          console.log("yay!");
          console.log(clickedEl);
        }
      });
    });
  });
});
