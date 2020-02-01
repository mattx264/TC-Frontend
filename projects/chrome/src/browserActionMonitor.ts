import { OperatorModel } from "../../shared/src/lib/models/operatorModel";
import { XpathHelper } from "./xpathHelper";

export class BrowserActionMonitor {
    xpathHelper: XpathHelper;
    rightClickElementClicked: any;
    sendMessage: Function;
    constructor(xpathHelper:XpathHelper,sendMessage:Function){
        this.xpathHelper=xpathHelper;
        this.sendMessage=sendMessage;
    }
    addKeyDownEventListener = (e: KeyboardEvent) => {
        const activeElement = document.activeElement as HTMLInputElement;
        var xpath = this.xpathHelper.getInputElementXPath(activeElement);

        if (e.keyCode == 13) {//ENTER 
            e.preventDefault();
            this.sendMessage({
                action: 'sendKeys', path: xpath, value: 'Keys.ENTER'
            })
            setTimeout(() => {
                //TODO check if object 'e' can be resubmited. - issue can be when you have more than 1 form
                document.querySelector('form').submit();
            }, 100);
        }
    };
    addKeyUpEventListener = (e: KeyboardEvent) => {
        const activeElement = document.activeElement as HTMLInputElement;
        var xpath = this.xpathHelper.getInputElementXPath(activeElement);
        if (e.code.toLowerCase() == "tab" || e.code.toLowerCase() == "shiftleft" || e.code.toLowerCase() == "shiftright" || e.code.toLowerCase()=='backspace'
            || e.code.toLowerCase() == "controlright" || e.code.toLowerCase() == "controlleft" || e.code.toLowerCase() == "altright" || e.code.toLowerCase() == "altleft") {
            this.sendMessage({
                action: 'sendKeys', path: xpath, value: 'Keys.' + e.code.toUpperCase()
            });
            return;
        } else if (e.keyCode == 13) {
            //ENTER is handler in addKeyDownEventListener
            return;
        } else if (e.code === "Backspace") {

            this.sendMessage({
                action: 'sendKeys', path: xpath, value: 'Keys.BACKSPACE'
            })

        }
        else if (activeElement instanceof HTMLInputElement) {

            var xpath = this.xpathHelper.getActionElementXPath(activeElement);
            if (xpath === '/HTML') {
                xpath = this.xpathHelper.getElementXPath(activeElement);
            }
            let data = { action: 'sendKeys', path: xpath, value: e.key };
            this.sendMessage(data);
        }
    }
    addClickEventListener = (e: Event) => {
        this.checkAndMonitorSelectElement(e.target);
        var xpath = this.xpathHelper.getActionElementXPath(e.target as Node);
        if (xpath === '/HTML') {
            xpath = this.xpathHelper.getElementXPath(e.target as Node);
        }
        if (xpath === null) {
            return;
        }
        var data: OperatorModel = { action: 'click', path: xpath, value: null }
        //var data = { action: 'click', path: xpath, value: null }
        //this.tempEventElement = this.xpathHelper.getElementByXPath(xpath, document);


        this.sendMessage(data);
    }
    addDoubleClickEventListener = (e: MouseEvent) => {
        console.log("double click!!!");
        console.log(e)
    }
    addRightMouseListener = (e: MouseEvent) => {
        if (e.which !== 3) {
            this.addClickEventListener(e);
        }
        this.rightClickElementClicked = e.target as HTMLElement;
        this.rightClickElementClicked.classList.add("tc-selected-element");
        //right click 
    }
    checkAndMonitorSelectElement(element: any) {
        if (element.nodeName !== "SELECT") {
            return;
        }

        element.addEventListener('change', this.onChangeSelect);
    }
    onChangeSelect = (event) => {
        const xpath = this.xpathHelper.getElementXPath(event.target, document);
        this.sendMessage({ value: event.target.value, action: 'selectByValue', path: xpath });

    }
}