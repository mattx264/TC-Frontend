class Main {
    constructor() {
        this.actionLog = [];
        this.isInit = { startBrowserActionMonitor: false, startXHRMonitor: false };
        this.addKeyDownEventListener = (e) => {
            const activeElement = document.activeElement;
            var xpath = this.xpathHelper.getInputElementXPath(activeElement);
            if (e.keyCode == 13) { //ENTER 
                e.preventDefault();
                this.sendMessage({
                    action: 'sendKeys', path: xpath, value: 'Keys.ENTER'
                });
                setTimeout(() => {
                    //TODO check if object 'e' can be resubmited. - issue can be when you have more than 1 form
                    document.querySelector('form').submit();
                }, 100);
            }
        };
        this.addKeyUpEventListener = (e) => {
            const activeElement = document.activeElement;
            var xpath = this.xpathHelper.getInputElementXPath(activeElement);
            if (e.code == "Tab" || e.code == "ShiftLeft" || e.code == "ShiftRight"
                || e.code == "ControlRight" || e.code == "ControlLeft" || e.code == "AltRight" || e.code == "AltLeft") {
                this.sendMessage({
                    action: 'sendKeys', path: xpath, value: 'Keys.' + e.code.toUpperCase()
                });
                return;
            }
            else if (e.keyCode == 13) {
                //ENTER is handler in addKeyDownEventListener
                return;
            }
            else if (e.code === "Backspace") {
                this.sendMessage({
                    action: 'sendKeys', path: xpath, value: 'Keys.BACKSPACE'
                });
            }
            else if (activeElement instanceof HTMLInputElement) {
                var xpath = this.xpathHelper.getActionElementXPath(activeElement);
                if (xpath === '/HTML') {
                    xpath = this.xpathHelper.getElementXPath(activeElement);
                }
                let data = { action: 'sendKeys', path: xpath, value: e.key };
                this.sendMessage(data);
            }
        };
        this.addClickEventListener = (e) => {
            this.checkAndMonitorSelectElement(e.target);
            var xpath = this.xpathHelper.getActionElementXPath(e.target);
            if (xpath === '/HTML') {
                xpath = this.xpathHelper.getElementXPath(e.target);
            }
            if (xpath === null) {
                return;
            }
            var data = { action: 'click', path: xpath, value: null };
            this.tempEventElement = this.xpathHelper.getElementByXPath(xpath, document);
            this.sendMessage(data);
        };
        this.addDoubleClickEventListener = (e) => {
            console.log("double click!!!");
            console.log(e);
        };
        this.addRightMouseListener = (e) => {
            if (e.which !== 3) {
                this.addClickEventListener(e);
            }
            this.rightClickElementClicked = e.target;
            this.rightClickElementClicked.classList.add("tc-selected-element");
            //right click 
        };
        this.onChangeSelect = (event) => {
            const xpath = this.xpathHelper.getElementXPath(event.target, document);
            this.sendMessage({ value: event.target.value, action: 'selectByValue', path: xpath });
        };
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
        chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
            switch (message.method) {
                case 'getUrl':
                    this.sendMessage({
                        action: 'goToUrl',
                        value: location.href,
                        path: null
                    });
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
        });
        this.sendMessageToPopup({ type: 'hello' });
    }
    sendMessage(data) {
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
    sendUpdateMessage(data) {
        this.sendMessageToPopup({ type: 'appendLastValue', data: data });
    }
    sendMessageToPopup(message, callBack) {
        if (chrome.runtime) {
            chrome.runtime.sendMessage(message, function (response) {
                console.log(response);
                callBack(response);
            });
        }
    }
    checkAndMonitorSelectElement(element) {
        if (element.nodeName !== "SELECT") {
            return;
        }
        element.addEventListener('change', this.onChangeSelect);
    }
    startXHRMonitor() {
        if (this.isInit.startXHRMonitor === true) {
            return;
        }
        this.isInit.startXHRMonitor = true;
        localStorage.setItem('isInit', JSON.stringify(this.isInit));
        new RequestionMonitor().startMonitor(this.sendMessage.bind(this));
    }
    startBrowserActionMonitor() {
        if (this.isInit.startBrowserActionMonitor === true) {
            return;
        }
        this.isInit.startBrowserActionMonitor = true;
        localStorage.setItem('isInit', JSON.stringify(this.isInit));
        this.xpathHelper = new XpathHelper();
        // click is not always working so let try mousedown
        //document.addEventListener("click", this.addClickEventListener);
        document.addEventListener("mousedown", this.addRightMouseListener);
        document.addEventListener("keyup", this.addKeyUpEventListener);
        document.addEventListener("keydown", this.addKeyDownEventListener);
        document.addEventListener("dblclick", this.addDoubleClickEventListener);
    }
}
new Main();
