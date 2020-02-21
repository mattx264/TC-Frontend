import { OperatorModel } from "../../shared/src/lib/models/operatorModel";
import { BrowserActionMonitor } from "./browserActionMonitor";
import { XpathHelper } from "./xpathHelper";
import { RequestionMonitor } from "./requestMonitor";

export class Main {
    xpathHelper: XpathHelper;
    // tempEventElement: HTMLElement;
    tempElementValue: string;
    rightClickElementClicked: HTMLElement;
    actionLog: OperatorModel[] = [];

    isInit: { startBrowserActionMonitor, startXHRMonitor } = { startBrowserActionMonitor: false, startXHRMonitor: false };

    constructor() {
        if (localStorage.getItem('isStart') === 'true') {
            this.sendMessageToPopup({
                type: 'getInfo', data: {
                    action: 'isStarted'
                }
            }, (response) => {
                if (response !== true) {
                    localStorage.setItem('isStart', 'false');
                }
            });
        }
        if (chrome.runtime.onMessage.hasListener(this.onMessage.bind(this)) == false) {
            chrome.runtime.onMessage.addListener(this.onMessage.bind(this));

        }
        this.sendMessageToPopup({ type: 'hello' });
    }
    onMessage(message: any, sender: any, sendResponse: any) {
        switch (message.method) {
            case 'getUrl':
                this.sendMessage({
                    action: 'goToUrl',
                    value: location.href,
                    path: null
                });
                sendResponse(location.href)
                break;
            case 'startBrowserActionMonitor':
                localStorage.setItem('isStart', 'true');
                this.startBrowserActionMonitor();
                break;
            case 'startXHRMonitor':
                this.startXHRMonitor();
                break;
            default:
                throw new Error("Message method not support - add new case " + message.method);

        }
        sendResponse({ successful: true });
    }
    sendMessage(data: OperatorModel) {
        if (!chrome.runtime) {
            return;
        }
        if (this.actionLog.length > 0) {
            const prev = this.actionLog[this.actionLog.length - 1];
            if (prev.path === data.path && prev.action === 'sendKeys' && (data.value !== null && data.value.indexOf('Keys.') === -1)) {
                this.sendUpdateMessage(data);
                return;
            }
        }
        this.actionLog.push(data);
        this.sendMessageToPopup({ type: 'insert', data: data });

    }
    sendUpdateMessage(data: OperatorModel) {
        this.sendMessageToPopup({ type: 'appendLastValue', data: data });

    }
    sendMessageToPopup(message, callBack?) {
        if (chrome.runtime) {
            chrome.runtime.sendMessage(message, function (response: any) {
                console.log(response);
                if (!!callBack) {
                    callBack(response);
                }
            });
        }
    }


    private startXHRMonitor() {
        if (this.isInit.startXHRMonitor === true) {
            return;
        }
        this.isInit.startXHRMonitor = true;
        localStorage.setItem('isInit', JSON.stringify(this.isInit));
        new RequestionMonitor().startMonitor(this.sendMessage.bind(this));
    }
    private startBrowserActionMonitor() {
        if (this.isInit.startBrowserActionMonitor === true) {
            return;
        }
        this.isInit.startBrowserActionMonitor = true;
        localStorage.setItem('isInit', JSON.stringify(this.isInit));
        this.xpathHelper = new XpathHelper();


        new BrowserActionMonitor(this.xpathHelper, this.sendMessage.bind(this));

    }
}

