"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const selenium_webdriver_1 = require("selenium-webdriver");
const protractor_1 = require("protractor");
class BrowserUtil {
    static finder(elt) {
        return elt instanceof protractor_1.ElementFinder ? elt : protractor_1.$(elt);
    }
    static finderAll(elt) {
        return elt instanceof protractor_1.ElementArrayFinder ? elt : protractor_1.$$(elt);
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
        return elt instanceof protractor_1.ElementFinder ? elt.locator() : protractor_1.$(elt).locator();
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
            return new selenium_webdriver_1.promise.Promise((resolve) => {
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
        return BrowserUtil.promisify(protractor_1.browser.wait(() => {
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
exports.BrowserUtil = BrowserUtil;
//# sourceMappingURL=browser-util.js.map