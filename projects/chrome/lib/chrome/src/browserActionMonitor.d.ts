import { XpathHelper } from "./xpathHelper";
export declare class BrowserActionMonitor {
    xpathHelper: XpathHelper;
    rightClickElementClicked: any;
    sendMessage: Function;
    constructor(xpathHelper: XpathHelper, sendMessage: Function);
    addKeyDownEventListener: (e: KeyboardEvent) => void;
    addKeyUpEventListener: (e: KeyboardEvent) => void;
    addClickEventListener: (e: Event) => void;
    addDoubleClickEventListener: (e: MouseEvent) => void;
    addRightMouseListener: (e: MouseEvent) => void;
    checkAndMonitorSelectElement(element: any): void;
    onChangeSelect: (event: any) => void;
}
