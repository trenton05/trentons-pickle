import { Client, RawResult, Element } from "webdriverio";

export type ElementFinder = Client<RawResult<Element>> & RawResult<Element>;

export class BrowserUtil {

    public static finder(elt: any): ElementFinder {
        return typeof elt === 'string' ? browser.$(elt) : elt;
    }

    public static finderAll(elt: any): ElementFinder[] {
        return typeof elt === 'string' ? browser.$$(elt) : elt;
    }

    public static async doAll(elt: any, callback: (f: ElementFinder) => Promise<any>) {
        const all = BrowserUtil.finderAll(elt);

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
        const onError = (e) => {
            error = e;
            return new Promise((resolve) => {
                setTimeout(() => {
                    timeout = Math.min(1000, timeout * 2);
                    resolve(false);
                }, timeout);
            });
        };
        const onSuccess = () => {
            clearTimeout(timer);
            return true;
        };
        return browser.waitUntil(() => {
            try {
                const val = fn();
                if (val && val.then) {
                    return val.then(onSuccess).catch(onError);
                }
                return onSuccess();
            } catch (e) {
                return onError(e);
            }
        });
    }
}
