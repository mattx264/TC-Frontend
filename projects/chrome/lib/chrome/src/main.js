import { BrowserActionMonitor } from "./browserActionMonitor";
var Main = /** @class */ (function () {
    function Main() {
        var _this = this;
        this.actionLog = [];
        this.isInit = { startBrowserActionMonitor: false, startXHRMonitor: false };
        if (localStorage.getItem('isStart') === 'true') {
            this.sendMessageToPopup({
                type: 'getInfo', data: {
                    action: 'isStarted'
                }
            }, function (response) {
                if (response !== true) {
                    localStorage.setItem('isStart', 'false');
                }
            });
        }
        chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
            switch (message.method) {
                case 'getUrl':
                    _this.sendMessage({
                        action: 'goToUrl',
                        value: location.href,
                        path: null
                    });
                    break;
                case 'startBrowserActionMonitor':
                    localStorage.setItem('isStart', 'true');
                    _this.startBrowserActionMonitor();
                    break;
                case 'startXHRMonitor':
                    _this.startXHRMonitor();
                    break;
                default:
                    throw new Error("Message method not support - add new case " + message.method);
            }
            sendResponse({ successful: true });
        });
        this.sendMessageToPopup({ type: 'hello' });
    }
    // addKeyDownEventListener = (e: KeyboardEvent) => {
    //     const activeElement = document.activeElement as HTMLInputElement;
    //     var xpath = this.xpathHelper.getInputElementXPath(activeElement);
    //     if (e.keyCode == 13) {//ENTER 
    //         e.preventDefault();
    //         this.sendMessage({
    //             action: 'sendKeys', path: xpath, value: 'Keys.ENTER'
    //         })
    //         setTimeout(() => {
    //             //TODO check if object 'e' can be resubmited. - issue can be when you have more than 1 form
    //             document.querySelector('form').submit();
    //         }, 100);
    //     }
    // };
    // addKeyUpEventListener = (e: KeyboardEvent) => {
    //     const activeElement = document.activeElement as HTMLInputElement;
    //     var xpath = this.xpathHelper.getInputElementXPath(activeElement);
    //     if (e.code.toLowerCase() == "tab" || e.code.toLowerCase() == "shiftleft" || e.code.toLowerCase() == "shiftright" || e.code.toLowerCase()=='backspace'
    //         || e.code.toLowerCase() == "controlright" || e.code.toLowerCase() == "controlleft" || e.code.toLowerCase() == "altright" || e.code.toLowerCase() == "altleft") {
    //         this.sendMessage({
    //             action: 'sendKeys', path: xpath, value: 'Keys.' + e.code.toUpperCase()
    //         });
    //         return;
    //     } else if (e.keyCode == 13) {
    //         //ENTER is handler in addKeyDownEventListener
    //         return;
    //     } else if (e.code === "Backspace") {
    //         this.sendMessage({
    //             action: 'sendKeys', path: xpath, value: 'Keys.BACKSPACE'
    //         })
    //     }
    //     else if (activeElement instanceof HTMLInputElement) {
    //         var xpath = this.xpathHelper.getActionElementXPath(activeElement);
    //         if (xpath === '/HTML') {
    //             xpath = this.xpathHelper.getElementXPath(activeElement);
    //         }
    //         let data = { action: 'sendKeys', path: xpath, value: e.key };
    //         this.sendMessage(data);
    //     }
    // }
    // addClickEventListener = (e: Event) => {
    //     this.checkAndMonitorSelectElement(e.target);
    //     var xpath = this.xpathHelper.getActionElementXPath(e.target as Node);
    //     if (xpath === '/HTML') {
    //         xpath = this.xpathHelper.getElementXPath(e.target as Node);
    //     }
    //     if (xpath === null) {
    //         return;
    //     }
    //     var data: OperatorModel = { action: 'click', path: xpath, value: null }
    //     this.tempEventElement = this.xpathHelper.getElementByXPath(xpath, document);
    //     this.sendMessage(data);
    // }
    // addDoubleClickEventListener = (e: MouseEvent) => {
    //     console.log("double click!!!");
    //     console.log(e)
    // }
    // addRightMouseListener = (e: MouseEvent) => {
    //     if (e.which !== 3) {
    //         this.addClickEventListener(e);
    //     }
    //     this.rightClickElementClicked = e.target as HTMLElement;
    //     this.rightClickElementClicked.classList.add("tc-selected-element");
    //     //right click 
    // }
    Main.prototype.sendMessage = function (data) {
        if (!chrome.runtime) {
            return;
        }
        if (this.actionLog.length > 0) {
            var prev = this.actionLog[this.actionLog.length - 1];
            if (prev.path === data.path && prev.action === 'sendKeys' && (data.value !== null && data.value.indexOf('Keys.') === -1)) {
                this.sendUpdateMessage(data);
                return;
            }
        }
        this.actionLog.push(data);
        this.sendMessageToPopup({ type: 'insert', data: data });
    };
    Main.prototype.sendUpdateMessage = function (data) {
        this.sendMessageToPopup({ type: 'appendLastValue', data: data });
    };
    Main.prototype.sendMessageToPopup = function (message, callBack) {
        if (chrome.runtime) {
            chrome.runtime.sendMessage(message, function (response) {
                console.log(response);
                callBack(response);
            });
        }
    };
    Main.prototype.startXHRMonitor = function () {
        if (this.isInit.startXHRMonitor === true) {
            return;
        }
        this.isInit.startXHRMonitor = true;
        localStorage.setItem('isInit', JSON.stringify(this.isInit));
        new RequestionMonitor().startMonitor(this.sendMessage.bind(this));
    };
    Main.prototype.startBrowserActionMonitor = function () {
        if (this.isInit.startBrowserActionMonitor === true) {
            return;
        }
        this.isInit.startBrowserActionMonitor = true;
        localStorage.setItem('isInit', JSON.stringify(this.isInit));
        this.xpathHelper = new XpathHelper();
        new BrowserActionMonitor(this.xpathHelper, this.sendMessage);
        // document.addEventListener("mousedown", this.addRightMouseListener);
        // document.addEventListener("keyup", this.addKeyUpEventListener);
        // document.addEventListener("keydown", this.addKeyDownEventListener);
        // document.addEventListener("dblclick", this.addDoubleClickEventListener);
    };
    return Main;
}());
new Main();
//# sourceMappingURL=main.js.map