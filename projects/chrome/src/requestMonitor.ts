
class RequestionMonitor {
    constructor() {

    }
    startMonitor(sendMessage) {

        var port = (<any>chrome).extension.connect({
            name: "Sample Communication"
        });

        port.onMessage.addListener(function (msg) {
            if (msg.type === 'xhrStart') {
                sendMessage({
                    action: msg.type,
                    value: [msg.data.url, msg.data.method],
                    path: null
                });
            } else if (msg.type === 'xhrDone') {
                sendMessage({
                    action: msg.type,
                    value: [msg.data.url, msg.data.method, msg.data.statusCode],
                    path: null
                });
            }
        });
    }
}