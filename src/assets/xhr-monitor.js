var test = function () {
  if (typeof xhrMonitor === "undefined") {
    var xhrMonitor = () => {
      var origOpen = XMLHttpRequest.prototype.open;
      XMLHttpRequest.prototype.open = function () {
        let guid = createGUID();
        this.onreadystatechange = () => {
          if (this.readyState === 3) {
            if (window.localStorage.getItem('xhrCalls') === null) {
              window.localStorage.setItem('xhrCalls', JSON.stringify([{ key: guid, value: { responseURl: this.responseURL, readyState: this.readyState, httpStatus: this.status, httpStatusText: this.statusText } }]));
            } else {
              let xhrCalls = JSON.parse(window.localStorage.getItem('xhrCalls'));
              xhrCalls.push({ key: guid, value: { responseURl: this.responseURL, readyState: this.readyState, httpStatus: this.status, httpStatusText: this.statusText } });
              window.localStorage.setItem('xhrCalls', JSON.stringify(xhrCalls));
            }
          }

          if (this.readyState === 4) {
            let xhrCalls = JSON.parse(window.localStorage.getItem('xhrCalls'));

            let xhrCall = xhrCalls.find(e => e.key === guid);
            if (xhrCall) {
              xhrCall.value = { responseURl: this.responseURL, readyState: this.readyState, httpStatus: this.status, httpStatusText: this.statusText }
            } else {
              xhrCalls.push({ key: guid, value: { responseURl: this.responseURL, readyState: this.readyState, httpStatus: this.status, httpStatusText: this.statusText } });
            }
            window.localStorage.setItem('xhrCalls', JSON.stringify(xhrCalls));
          }
          console.log('request completed!');

        };
        origOpen.apply(this, arguments);
      };
    };


    var createGUID = () => {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
    }
    xhrMonitor();
  }
}
test();


checkIfAllXhrsCallsDone = () => {
  let xhrCalls = JSON.parse(window.localStorage.getItem('xhrCalls'));
  let allCallsDone = true;
  if (xhrCalls) {
    for (let xhrCall of xhrCalls) {
      if (xhrCall.value.readyState !== 4) {
        allCallsDone = false;
        break;
      }
    }
  }

  return allCallsDone;
};

checkIfAllXhrsCallsDone();

checkIfXhrCallIsDone = () => {

  const responseURL = '#####'

  let xhrCalls = JSON.parse(window.localStorage.getItem('xhrCalls'));
  if (xhrCalls) {
    for (let xhrCall of xhrCalls) {
      if (xhrCall.value.responseURL === responseURL) {
        if (xhrCall.value.readyState === 4) {
          return true;
        } else {
          return false;
        }
      }
    }

    return false;
  }
}

checkIfXhrCallIsDone();
