import { Client, RawResult, Element } from "webdriverio";

export type ElementFinder = Client<RawResult<Element>> & RawResult<Element>;

export class BrowserUtil {

    public static async finder(elt: any) {
        return typeof elt === 'string' ? await browser.$(elt) : elt;
    }

    public static async finderAll(elt: any) {
        return typeof elt === 'string' ? await browser.$$(elt) : elt;
    }

    public static async doAll(elt: any, callback: (f: ElementFinder) => Promise<any>) {
        const all = await BrowserUtil.finderAll(elt);

        for (let i = 0; i < await all.length; i++) {
            await callback(all[i]);
        }
    }

    public static safeWait(fn: () => any): Promise<any> {
        let timeout = 100;
        let error = null;
        const timer = setTimeout(() => {
            if (error) {
                console.log(error); // tslint:disable-line no-console
            }
        }, 5000);
        return browser.waitUntil(async () => {
            try {
                await fn();
                clearTimeout(timer);
                return true;
            } catch (e) {
                error = e;
                await new Promise((resolve) => {
                    setTimeout(resolve, timeout);
                })
                timeout = Math.min(1000, timeout * 2);
                return false;
            }
        });
    }
}
