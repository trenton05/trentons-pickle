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
class BrowserUtil {
    static finder(elt) {
        return typeof elt === 'string' ? browser.$(elt) : elt;
    }
    static finderAll(elt) {
        return typeof elt === 'string' ? browser.$$(elt) : elt;
    }
    static doAll(elt, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const all = BrowserUtil.finderAll(elt);
            for (let i = 0; i < (yield all.length); i++) {
                yield callback(all[i]);
            }
        });
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
            }
            catch (e) {
                return onError(e);
            }
        });
    }
}
exports.BrowserUtil = BrowserUtil;
//# sourceMappingURL=browser-util.js.map