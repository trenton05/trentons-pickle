var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { binding, given, then, when } from 'cucumber-tsflow';
import { mapping } from './mapping';
import { browser, ExpectedConditions } from 'protractor';
import * as Chance from 'chance';
import { BrowserUtil } from './browser-util';
const chance = new Chance();
let GlobalSteps = class GlobalSteps {
    static randomMapping(type) {
        return __awaiter(this, void 0, void 0, function* () {
            return chance[type]();
        });
    }
    navigate(pageMatch) {
        return __awaiter(this, void 0, void 0, function* () {
            const page = yield mapping(pageMatch);
            yield browser.get(page);
        });
    }
    contains(pageMatch) {
        return __awaiter(this, void 0, void 0, function* () {
            const page = yield mapping(pageMatch);
            yield browser.wait(ExpectedConditions.urlContains(page));
        });
    }
    loaded(pageMatch) {
        return __awaiter(this, void 0, void 0, function* () {
            let page = yield mapping(pageMatch);
            page = browser.baseUrl + page;
            yield browser.wait(ExpectedConditions.urlIs(page));
        });
    }
    randomString(type, name) {
        if (type === 'id') {
            return mapping(name, IdUtil.randomId());
        }
        else {
            return mapping(name, chance[type]());
        }
    }
    assignText(type, name) {
        return __awaiter(this, void 0, void 0, function* () {
            yield BrowserUtil.safeWait(() => __awaiter(this, void 0, void 0, function* () {
                const elt = yield mapping(type);
                const finder = BrowserUtil.finder(elt);
                const text = yield finder.getText();
                mapping(name, text);
            }));
        });
    }
    assignValue(type, name) {
        return __awaiter(this, void 0, void 0, function* () {
            yield BrowserUtil.safeWait(() => __awaiter(this, void 0, void 0, function* () {
                const elt = yield mapping(type);
                const finder = BrowserUtil.finder(elt);
                const text = yield finder.getAttribute('value');
                mapping(name, text);
            }));
        });
    }
    emptyLocalStorage() {
        return __awaiter(this, void 0, void 0, function* () {
            yield browser.executeScript('window.localStorage.clear();');
        });
    }
    emptySessionStorage() {
        return __awaiter(this, void 0, void 0, function* () {
            yield browser.executeScript('window.sessionStorage.clear();');
        });
    }
    logConsole(name) {
        return __awaiter(this, void 0, void 0, function* () {
            yield captureLogs(name);
        });
    }
    setWaitForAngular(enabledStr) {
        return __awaiter(this, void 0, void 0, function* () {
            browser.waitForAngularEnabled(enabledStr === 'on');
        });
    }
    reloadPage() {
        return __awaiter(this, void 0, void 0, function* () {
            yield browser.driver.navigate().refresh();
        });
    }
};
__decorate([
    when(/^I navigate to (.*)$/i),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GlobalSteps.prototype, "navigate", null);
__decorate([
    then(/^(.*) is in the url/i),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GlobalSteps.prototype, "contains", null);
__decorate([
    then(/^(.*) is the url/i),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GlobalSteps.prototype, "loaded", null);
__decorate([
    given(/^Random (.*) as (.*)$/i),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], GlobalSteps.prototype, "randomString", null);
__decorate([
    given(/^The text in (.*) as (.*)$/i),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], GlobalSteps.prototype, "assignText", null);
__decorate([
    given(/^The value in (.*) as (.*)$/i),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], GlobalSteps.prototype, "assignValue", null);
__decorate([
    given(/^Local storage is empty$/i),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], GlobalSteps.prototype, "emptyLocalStorage", null);
__decorate([
    given(/^Session storage is empty$/i),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], GlobalSteps.prototype, "emptySessionStorage", null);
__decorate([
    then(/I log the browser console called '(.*)'/),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GlobalSteps.prototype, "logConsole", null);
__decorate([
    given(/^wait for Angular is (on|off)$/i),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GlobalSteps.prototype, "setWaitForAngular", null);
__decorate([
    when(/^I (?:reload|refresh) the page$/i),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], GlobalSteps.prototype, "reloadPage", null);
__decorate([
    mapping(/^random (.*)$/i),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GlobalSteps, "randomMapping", null);
GlobalSteps = __decorate([
    binding()
], GlobalSteps);
export default GlobalSteps;
//# sourceMappingURL=global.steps.js.map