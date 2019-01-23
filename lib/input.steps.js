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
import { binding, when } from 'cucumber-tsflow';
import { browser, by, ElementFinder, ExpectedConditions, Key } from 'protractor';
import { mapping } from './mapping';
import { BrowserUtil } from './browser-util';
import * as path from 'path';
let InputSteps = class InputSteps {
    clickStep(all, eltMatch) {
        return __awaiter(this, void 0, void 0, function* () {
            all ? yield clickAll(eltMatch) : yield click(eltMatch);
        });
    }
    hover(eltMatch) {
        return __awaiter(this, void 0, void 0, function* () {
            const waitForAngular = yield browser.waitForAngularEnabled();
            if (waitForAngular) {
                yield browser.waitForAngularEnabled(false);
            }
            yield BrowserUtil.safeWait(() => __awaiter(this, void 0, void 0, function* () {
                const elt = yield mapping(eltMatch);
                const finder = BrowserUtil.finder(elt);
                yield browser.actions().mouseMove(finder).perform();
            }));
            yield browser.waitForAngularEnabled(waitForAngular);
        });
    }
    hoverWithTextAndClickElement(inputMatch, textMatch, clickMatch) {
        return __awaiter(this, void 0, void 0, function* () {
            yield BrowserUtil.safeWait(() => __awaiter(this, void 0, void 0, function* () {
                const [input, text, click] = yield mapping([inputMatch, textMatch, clickMatch]);
                const result = yield browser.findElement(by.cssContainingText(input, text));
                yield browser.actions().mouseMove(result).perform();
                yield browser.actions().click(yield result.findElement(by.css(click))).perform();
            }));
        });
    }
    enterTextStep(clearText, clickText, textMatch, eltMatch) {
        return __awaiter(this, void 0, void 0, function* () {
            const [text] = yield mapping([textMatch]);
            yield enterText(eltMatch, text, clearText != null && clearText.length > 0, clickText != null && clickText.length > 0);
        });
    }
    sendFile(textMatch, eltMatch) {
        return __awaiter(this, void 0, void 0, function* () {
            yield BrowserUtil.safeWait(() => __awaiter(this, void 0, void 0, function* () {
                const text = yield mapping(textMatch);
                const elt = yield mapping(eltMatch);
                const finder = BrowserUtil.finder(elt);
                yield scrollIntoView(finder);
                const web = yield finder.getWebElement();
                yield web.sendKeys(path.resolve(process.cwd(), text));
            }));
        });
    }
    select(theMatch, textMatch, eltMatch) {
        return __awaiter(this, void 0, void 0, function* () {
            const [text, elt] = yield mapping([textMatch, eltMatch]);
            const finder = BrowserUtil.finder(elt).element(by.cssContainingTextInsensitive('option', text));
            yield browser.wait(ExpectedConditions.presenceOf(finder));
            const elem = yield finder.getWebElement();
            yield scrollIntoView(elem);
            yield elem.click();
        });
    }
    hitEnter(eltMatch) {
        return __awaiter(this, void 0, void 0, function* () {
            const elt = yield mapping(eltMatch);
            const finder = BrowserUtil.finder(elt);
            yield scrollIntoView(finder);
            yield browser.wait(ExpectedConditions.visibilityOf(finder));
            const web = yield finder.getWebElement();
            yield web.click();
            yield web.sendKeys(Key.ENTER);
        });
    }
    changeCheckboxValue(negate, eltMatch) {
        return __awaiter(this, void 0, void 0, function* () {
            yield BrowserUtil.safeWait(() => __awaiter(this, void 0, void 0, function* () {
                const elt = yield mapping(eltMatch);
                const finder = BrowserUtil.finder(elt);
                const checkedAttr = yield finder.getAttribute('checked');
                if (Boolean(checkedAttr) === Boolean(negate)) {
                    yield click(eltMatch);
                }
            }));
        });
    }
};
__decorate([
    when(/^I click (all )?(?:of )?(.*)$/i),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Boolean, String]),
    __metadata("design:returntype", Promise)
], InputSteps.prototype, "clickStep", null);
__decorate([
    when(/^I hover over (.*)$/i),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], InputSteps.prototype, "hover", null);
__decorate([
    when(/^I hover (.*) with text (.*) and click (.*)$/i),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], InputSteps.prototype, "hoverWithTextAndClickElement", null);
__decorate([
    when(/^I (clear and )?(click into and )?enter (.*) into (.*)$/i),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String]),
    __metadata("design:returntype", Promise)
], InputSteps.prototype, "enterTextStep", null);
__decorate([
    when(/^I send file (.*) to (.*)$/i),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], InputSteps.prototype, "sendFile", null);
__decorate([
    when(/^I select( the)? (.*) option from (.*)$/i),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], InputSteps.prototype, "select", null);
__decorate([
    when(/^I hit enter on (.*)$/i),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], InputSteps.prototype, "hitEnter", null);
__decorate([
    when(/^I (un)?check the (.*)$/i),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], InputSteps.prototype, "changeCheckboxValue", null);
InputSteps = __decorate([
    binding()
], InputSteps);
export default InputSteps;
export function enterText(field, text, shouldClear, shouldClick) {
    return __awaiter(this, void 0, void 0, function* () {
        const [elt] = yield mapping([field]);
        const finder = BrowserUtil.finder(elt);
        yield scrollIntoView(finder);
        yield browser.wait(ExpectedConditions.visibilityOf(finder));
        const web = yield finder.getWebElement();
        if (shouldClear) {
            yield web.clear();
            yield web.sendKeys('1');
            const textValue = yield web.getAttribute('value');
            for (let i = 0; i < textValue.length; i++) {
                yield web.sendKeys(Key.BACK_SPACE);
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
                    parts[i] = part === 'ctrl' ? Key.CONTROL : part.length > 1 ? Key[part.toUpperCase()] : part;
                }
                list.push(parts.length === 1 ? parts[0] : Key.chord.apply(Key, parts));
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
export function click(field) {
    return __awaiter(this, void 0, void 0, function* () {
        const elt = yield mapping(field);
        const finder = BrowserUtil.finder(elt);
        yield scrollIntoView(finder);
        yield browser.wait(ExpectedConditions.elementToBeClickable(finder));
        const web = yield finder.getWebElement();
        yield web.click();
    });
}
export function clickAll(field) {
    return __awaiter(this, void 0, void 0, function* () {
        const elt = yield mapping(field);
        yield BrowserUtil.doAll(elt, (f) => __awaiter(this, void 0, void 0, function* () {
            yield scrollIntoView(f);
            yield browser.wait(ExpectedConditions.elementToBeClickable(f));
            const web = yield f.getWebElement();
            yield web.click();
        }));
    });
}
export function scrollIntoView(el) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const web = el instanceof ElementFinder ? yield el.getWebElement() : el;
            yield browser.executeScript(`
      arguments[0].scrollIntoView({block: "center"});
      `, web);
        }
        catch (error) {
            // task isn't critical, don't fail step
            // tslint:disable no-empty
        }
    });
}
//# sourceMappingURL=input.steps.js.map