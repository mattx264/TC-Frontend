export enum WebDriverOperationType {
    BrowserOperation,
    ElementOperation,
    Locators,
    SelectElementOperation,
    BrowserNavigationOperation,
    ElementOperationCombo,
    JavascriptOperation
}

export interface SeleniumCommand {
    operationId: number;
    webDriverOperationType: WebDriverOperationType;
    values: Array<string>;
    guid: string;
}
