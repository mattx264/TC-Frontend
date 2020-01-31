var BrowserActionMonitor = /** @class */ (function () {
    function BrowserActionMonitor(xpathHelper, sendMessage) {
        var _this = this;
        this.addKeyDownEventListener = function (e) {
            var activeElement = document.activeElement;
            var xpath = _this.xpathHelper.getInputElementXPath(activeElement);
            if (e.keyCode == 13) { //ENTER 
                e.preventDefault();
                _this.sendMessage({
                    action: 'sendKeys', path: xpath, value: 'Keys.ENTER'
                });
                setTimeout(function () {
                    //TODO check if object 'e' can be resubmited. - issue can be when you have more than 1 form
                    document.querySelector('form').submit();
                }, 100);
            }
        };
        this.addKeyUpEventListener = function (e) {
            var activeElement = document.activeElement;
            var xpath = _this.xpathHelper.getInputElementXPath(activeElement);
            if (e.code.toLowerCase() == "tab" || e.code.toLowerCase() == "shiftleft" || e.code.toLowerCase() == "shiftright" || e.code.toLowerCase() == 'backspace'
                || e.code.toLowerCase() == "controlright" || e.code.toLowerCase() == "controlleft" || e.code.toLowerCase() == "altright" || e.code.toLowerCase() == "altleft") {
                _this.sendMessage({
                    action: 'sendKeys', path: xpath, value: 'Keys.' + e.code.toUpperCase()
                });
                return;
            }
            else if (e.keyCode == 13) {
                //ENTER is handler in addKeyDownEventListener
                return;
            }
            else if (e.code === "Backspace") {
                _this.sendMessage({
                    action: 'sendKeys', path: xpath, value: 'Keys.BACKSPACE'
                });
            }
            else if (activeElement instanceof HTMLInputElement) {
                var xpath = _this.xpathHelper.getActionElementXPath(activeElement);
                if (xpath === '/HTML') {
                    xpath = _this.xpathHelper.getElementXPath(activeElement);
                }
                var data = { action: 'sendKeys', path: xpath, value: e.key };
                _this.sendMessage(data);
            }
        };
        this.addClickEventListener = function (e) {
            _this.checkAndMonitorSelectElement(e.target);
            var xpath = _this.xpathHelper.getActionElementXPath(e.target);
            if (xpath === '/HTML') {
                xpath = _this.xpathHelper.getElementXPath(e.target);
            }
            if (xpath === null) {
                return;
            }
            var data = { action: 'click', path: xpath, value: null };
            //var data = { action: 'click', path: xpath, value: null }
            //this.tempEventElement = this.xpathHelper.getElementByXPath(xpath, document);
            _this.sendMessage(data);
        };
        this.addDoubleClickEventListener = function (e) {
            console.log("double click!!!");
            console.log(e);
        };
        this.addRightMouseListener = function (e) {
            if (e.which !== 3) {
                _this.addClickEventListener(e);
            }
            _this.rightClickElementClicked = e.target;
            _this.rightClickElementClicked.classList.add("tc-selected-element");
            //right click 
        };
        this.onChangeSelect = function (event) {
            var xpath = _this.xpathHelper.getElementXPath(event.target, document);
            _this.sendMessage({ value: event.target.value, action: 'selectByValue', path: xpath });
        };
        this.xpathHelper = xpathHelper;
        this.sendMessage = sendMessage;
    }
    BrowserActionMonitor.prototype.checkAndMonitorSelectElement = function (element) {
        if (element.nodeName !== "SELECT") {
            return;
        }
        element.addEventListener('change', this.onChangeSelect);
    };
    return BrowserActionMonitor;
}());
export { BrowserActionMonitor };
//# sourceMappingURL=browserActionMonitor.js.map