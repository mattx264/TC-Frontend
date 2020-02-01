export declare class XpathHelper {
    getXPath(node: any): string;
    getElementXPath(node: Node | null, doc?: Document): string;
    getElementXPathByType(node: Node | null, doc?: Document, type?: string): string;
    getInputElementXPath(node: Node | null, doc?: Document): string;
    getActionElementXPath(node: Node | null, doc?: Document): string;
    getElementByXPath(xPath: string, doc: Document): any;
    getElementByXPathCount(xPath: string, doc: Document): void;
}
