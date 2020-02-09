var RequestionMonitor = /** @class */ (function () {
    function RequestionMonitor() {
    }
    RequestionMonitor.prototype.startMonitor = function (sendMessage) {
        var port = chrome.extension.connect({
            name: "Sample Communication"
        });
        port.onMessage.addListener(function (msg) {
            if (msg.type === 'xhrStart') {
                sendMessage({
                    action: msg.type,
                    value: [msg.data.url, msg.data.method],
                    xhrObject: msg,
                    path: null
                });
            }
            else if (msg.type === 'xhrDone') {
                sendMessage({
                    action: msg.type,
                    value: [msg.data.url, msg.data.method, msg.data.statusCode],
                    xhrObject: msg,
                    path: null
                });
            }
        });
    };
    return RequestionMonitor;
}());
export { RequestionMonitor };
//# sourceMappingURL=requestMonitor.js.map