"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
const cucumber_tsflow_1 = require("cucumber-tsflow");
const protractor_1 = require("protractor");
const mapping_1 = require("./mapping");
const browser_util_1 = require("./browser-util");
const path = require("path");
let InputSteps = class InputSteps {
    clickStep(all, eltMatch) {
        return __awaiter(this, void 0, void 0, function* () {
            all ? yield clickAll(eltMatch) : yield click(eltMatch);
        });
    }
    hover(eltMatch) {
        return __awaiter(this, void 0, void 0, function* () {
            const waitForAngular = yield protractor_1.browser.waitForAngularEnabled();
            if (waitForAngular) {
                yield protractor_1.browser.waitForAngularEnabled(false);
            }
            yield browser_util_1.BrowserUtil.safeWait(() => __awaiter(this, void 0, void 0, function* () {
                const elt = yield mapping_1.mapping(eltMatch);
                const finder = browser_util_1.BrowserUtil.finder(elt);
                yield protractor_1.browser.actions().mouseMove(finder).perform();
            }));
            yield protractor_1.browser.waitForAngularEnabled(waitForAngular);
        });
    }
    hoverWithTextAndClickElement(inputMatch, textMatch, clickMatch) {
        return __awaiter(this, void 0, void 0, function* () {
            yield browser_util_1.BrowserUtil.safeWait(() => __awaiter(this, void 0, void 0, function* () {
                const [input, text, click] = yield mapping_1.mapping([inputMatch, textMatch, clickMatch]);
                const result = yield protractor_1.browser.findElement(protractor_1.by.cssContainingText(input, text));
                yield protractor_1.browser.actions().mouseMove(result).perform();
                yield protractor_1.browser.actions().click(yield result.findElement(protractor_1.by.css(click))).perform();
            }));
        });
    }
    enterTextStep(clearText, clickText, textMatch, eltMatch) {
        return __awaiter(this, void 0, void 0, function* () {
            const [text] = yield mapping_1.mapping([textMatch]);
            yield enterText(eltMatch, text, clearText != null && clearText.length > 0, clickText != null && clickText.length > 0);
        });
    }
    sendFile(textMatch, eltMatch) {
        return __awaiter(this, void 0, void 0, function* () {
            yield browser_util_1.BrowserUtil.safeWait(() => __awaiter(this, void 0, void 0, function* () {
                const text = yield mapping_1.mapping(textMatch);
                const elt = yield mapping_1.mapping(eltMatch);
                const finder = browser_util_1.BrowserUtil.finder(elt);
                yield scrollIntoView(finder);
                const web = yield finder.getWebElement();
                yield web.sendKeys(path.resolve(process.cwd(), text));
            }));
        });
    }
    select(theMatch, textMatch, eltMatch) {
        return __awaiter(this, void 0, void 0, function* () {
            const [text, elt] = yield mapping_1.mapping([textMatch, eltMatch]);
            const finder = browser_util_1.BrowserUtil.finder(elt).element(protractor_1.by.cssContainingTextInsensitive('option', text));
            yield protractor_1.browser.wait(protractor_1.ExpectedConditions.presenceOf(finder));
            const elem = yield finder.getWebElement();
            yield scrollIntoView(elem);
            yield elem.click();
        });
    }
    hitEnter(eltMatch) {
        return __awaiter(this, void 0, void 0, function* () {
            const elt = yield mapping_1.mapping(eltMatch);
            const finder = browser_util_1.BrowserUtil.finder(elt);
            yield scrollIntoView(finder);
            yield protractor_1.browser.wait(protractor_1.ExpectedConditions.visibilityOf(finder));
            const web = yield finder.getWebElement();
            yield web.click();
            yield web.sendKeys(protractor_1.Key.ENTER);
        });
    }
    changeCheckboxValue(negate, eltMatch) {
        return __awaiter(this, void 0, void 0, function* () {
            yield browser_util_1.BrowserUtil.safeWait(() => __awaiter(this, void 0, void 0, function* () {
                const elt = yield mapping_1.mapping(eltMatch);
                const finder = browser_util_1.BrowserUtil.finder(elt);
                const checkedAttr = yield finder.getAttribute('checked');
                if (Boolean(checkedAttr) === Boolean(negate)) {
                    yield click(eltMatch);
                }
            }));
        });
    }
};
__decorate([
    cucumber_tsflow_1.when(/^I click (all )?(?:of )?(.*)$/i),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Boolean, String]),
    __metadata("design:returntype", Promise)
], InputSteps.prototype, "clickStep", null);
__decorate([
    cucumber_tsflow_1.when(/^I hover over (.*)$/i),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], InputSteps.prototype, "hover", null);
__decorate([
    cucumber_tsflow_1.when(/^I hover (.*) with text (.*) and click (.*)$/i),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], InputSteps.prototype, "hoverWithTextAndClickElement", null);
__decorate([
    cucumber_tsflow_1.when(/^I (clear and )?(click into and )?enter (.*) into (.*)$/i),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String]),
    __metadata("design:returntype", Promise)
], InputSteps.prototype, "enterTextStep", null);
__decorate([
    cucumber_tsflow_1.when(/^I send file (.*) to (.*)$/i),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], InputSteps.prototype, "sendFile", null);
__decorate([
    cucumber_tsflow_1.when(/^I select( the)? (.*) option from (.*)$/i),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], InputSteps.prototype, "select", null);
__decorate([
    cucumber_tsflow_1.when(/^I hit enter on (.*)$/i),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], InputSteps.prototype, "hitEnter", null);
__decorate([
    cucumber_tsflow_1.when(/^I (un)?check the (.*)$/i),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], InputSteps.prototype, "changeCheckboxValue", null);
InputSteps = __decorate([
    cucumber_tsflow_1.binding()
], InputSteps);
exports.default = InputSteps;
function enterText(field, text, shouldClear, shouldClick) {
    return __awaiter(this, void 0, void 0, function* () {
        const [elt] = yield mapping_1.mapping([field]);
        const finder = browser_util_1.BrowserUtil.finder(elt);
        yield scrollIntoView(finder);
        yield protractor_1.browser.wait(protractor_1.ExpectedConditions.visibilityOf(finder));
        const web = yield finder.getWebElement();
        if (shouldClear) {
            yield web.clear();
            yield web.sendKeys('1');
            const textValue = yield web.getAttribute('value');
            for (let i = 0; i < textValue.length; i++) {
                yield web.sendKeys(protractor_1.Key.BACK_SPACE);
            }
        }
        if (shouldClick) {
            yield web.click();
        }
        const reg = /(CTRL\+|ALT\+|SHIFT\+)*(.\+)*(ARROW_UP|ARROW_DOWN|SPACE|ENTER|.)/g;
        const list = [];
        while (true) {
            const match = reg.exec(text);
            if (!match) {
                break;
            }
            if (match[0].length === 1) {
                list.push(match[0]);
            }
            else {
                const parts = match[0].split(/\+/);
                for (let i = 0; i < parts.length; i++) {
                    const part = parts[i].toLowerCase();
                    parts[i] = part === 'ctrl' ? protractor_1.Key.CONTROL : part.length > 1 ? protractor_1.Key[part.toUpperCase()] : part;
                }
                list.push(parts.length === 1 ? parts[0] : protractor_1.Key.chord.apply(protractor_1.Key, parts));
            }
        }
        if (list.length > 0) {
            yield web.sendKeys.apply(web, list);
        }
        else {
            yield web.sendKeys(text);
        }
    });
}
exports.enterText = enterText;
function click(field) {
    return __awaiter(this, void 0, void 0, function* () {
        const elt = yield mapping_1.mapping(field);
        const finder = browser_util_1.BrowserUtil.finder(elt);
        yield scrollIntoView(finder);
        yield protractor_1.browser.wait(protractor_1.ExpectedConditions.elementToBeClickable(finder));
        const web = yield finder.getWebElement();
        yield web.click();
    });
}
exports.click = click;
function clickAll(field) {
    return __awaiter(this, void 0, void 0, function* () {
        const elt = yield mapping_1.mapping(field);
        yield browser_util_1.BrowserUtil.doAll(elt, (f) => __awaiter(this, void 0, void 0, function* () {
            yield scrollIntoView(f);
            yield protractor_1.browser.wait(protractor_1.ExpectedConditions.elementToBeClickable(f));
            const web = yield f.getWebElement();
            yield web.click();
        }));
    });
}
exports.clickAll = clickAll;
function scrollIntoView(el) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const web = el instanceof protractor_1.ElementFinder ? yield el.getWebElement() : el;
            yield protractor_1.browser.executeScript(`
      arguments[0].scrollIntoView({block: "center"});
      `, web);
        }
        catch (error) {
            // task isn't critical, don't fail step
            // tslint:disable no-empty
        }
    });
}
exports.scrollIntoView = scrollIntoView;
//# sourceMappingURL=input.steps.js.map