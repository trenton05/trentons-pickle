var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { promise as wdpromise } from 'selenium-webdriver';
import { browser, ElementFinder, $, $$, ElementArrayFinder } from 'protractor';
export class BrowserUtil {
    static finder(elt) {
        return elt instanceof ElementFinder ? elt : $(elt);
    }
    static finderAll(elt) {
        return elt instanceof ElementArrayFinder ? elt : $$(elt);
    }
    static doAll(elt, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const all = BrowserUtil.finderAll(elt);
            for (let i = 0; i < (yield all.count()); i++) {
                const finder = yield all.get(i);
                yield callback(finder);
            }
        });
    }
    static getLocator(elt) {
        return elt instanceof ElementFinder ? elt.locator() : $(elt).locator();
    }
    static getChild(parent, child) {
        const parentFinder = BrowserUtil.finder(parent);
        const childLocator = BrowserUtil.getLocator(child);
        return parentFinder.element(childLocator);
    }
    static safeWait(fn) {
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
            }
            catch (e) {
                return onError(e);
            }
        }));
    }
    static promisify(webDriverPromise) {
        return new Promise(function (resolve, reject) {
            webDriverPromise.then(function (res) {
                resolve(res);
            }).catch(function (err) {
                reject(err);
            });
        });
    }
}
//# sourceMappingURL=browser-util.js.map