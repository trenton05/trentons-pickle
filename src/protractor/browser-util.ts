import {promise as wdpromise} from 'selenium-webdriver';
import {browser, ElementFinder, $, $$, ElementArrayFinder} from 'protractor';

export class BrowserUtil {

    public static finder(elt: any): ElementFinder {
        return elt instanceof ElementFinder ? elt : $(elt);
    }

    public static finderAll(elt: any): ElementArrayFinder {
        return elt instanceof ElementArrayFinder ? elt : $$(elt);
    }

    public static async doAll(elt: any, callback: (f: ElementFinder) => Promise<any>) {
        const all: ElementArrayFinder = BrowserUtil.finderAll(elt);

        for (let i = 0; i < await all.count(); i++) {
            const finder: ElementFinder = await all.get(i);
            await callback(finder);
        }
    }

    public static getLocator(elt: ElementFinder | string): any {
        return elt instanceof ElementFinder ? elt.locator() : $(elt).locator();
    }

    public static getChild(parent: ElementFinder | string, child: ElementFinder | string): ElementFinder {
        const parentFinder = BrowserUtil.finder(parent);
        const childLocator = BrowserUtil.getLocator(child);
        return parentFinder.element(childLocator);
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
            return new wdpromise.Promise((resolve) => {
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
        return BrowserUtil.promisify(browser.wait(() => {
            try {
                const val = fn();
                if (val && val.then) {
                    return val.then(onSuccess).catch(onError);
                }
                return onSuccess();
            } catch (e) {
                return onError(e);
            }
        }));
    }

    public static promisify<T>(webDriverPromise: wdpromise.Promise<T>): Promise<T> {
        return new Promise(function (resolve, reject) {
            webDriverPromise.then(function (res: T) {
                resolve(res);
            }).catch(function (err) {
                reject(err);
            });
        });
    }
}
