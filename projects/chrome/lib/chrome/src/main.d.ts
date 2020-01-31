import { OperatorModel } from "../../shared/src/lib/models/operatorModel";
import { XpathHelper } from "./xpathHelper";
export declare class Main {
    xpathHelper: XpathHelper;
    tempElementValue: string;
    rightClickElementClicked: HTMLElement;
    actionLog: OperatorModel[];
    isInit: {
        startBrowserActionMonitor: any;
        startXHRMonitor: any;
    };
    constructor();
    sendMessage(data: OperatorModel): void;
    sendUpdateMessage(data: OperatorModel): void;
    sendMessageToPopup(message: any, callBack?: any): void;
    private startXHRMonitor;
    private startBrowserActionMonitor;
}
