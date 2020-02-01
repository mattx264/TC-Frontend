export interface OperatorModel {
    action: string;
    path: string;
    value: string | string[];
    guid?: string;
}
export interface XhrOperatorModel extends OperatorModel {
    action: string;
    path: string;
    value: string | string[];
    guid?: string;
    xhrObject: {
        type: string;
        data: {
            frameId: number;
            initiator: string;
            method: string;
            parentFrameId: number;
            requestHeaders: string[];
            requestId: string;
            tabId: number;
            timeStamp: number;
            type: string;
            url: string;
        };
    };
}
export declare class OperatorModelStatus implements OperatorModel {
    action: string;
    path: string;
    imagePath?: string;
    value: string | string[];
    guid?: string;
    status?: 'pending' | 'inprogress' | 'done' | 'failed';
    constructor();
}
