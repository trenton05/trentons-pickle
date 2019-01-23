import { promise as wdpromise } from 'selenium-webdriver';
import { ElementFinder, ElementArrayFinder } from 'protractor';
export declare class BrowserUtil {
    static finder(elt: any): ElementFinder;
    static finderAll(elt: any): ElementArrayFinder;
    static doAll(elt: any, callback: (f: ElementFinder) => Promise<any>): Promise<void>;
    static getLocator(elt: ElementFinder | string): any;
    static getChild(parent: ElementFinder | string, child: ElementFinder | string): ElementFinder;
    static safeWait(fn: () => any): Promise<any>;
    static promisify<T>(webDriverPromise: wdpromise.Promise<T>): Promise<T>;
}
