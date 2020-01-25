export interface SeleniumCommand {
    operationId: string;
    webDriverOperationType: number;
    values: string[];
    guid?: string;
}

