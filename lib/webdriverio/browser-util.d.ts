/// <reference types="webdriverio" />
import { Client, RawResult, Element } from "webdriverio";
export declare type ElementFinder = Client<RawResult<Element>> & RawResult<Element>;
export declare class BrowserUtil {
    static finder(elt: any): ElementFinder;
    static finderAll(elt: any): ElementFinder[];
    static doAll(elt: any, callback: (f: ElementFinder) => Promise<any>): Promise<void>;
    static safeWait(fn: () => any): Promise<any>;
}
