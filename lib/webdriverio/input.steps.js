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
const mapping_1 = require("../mapping");
const browser_util_1 = require("./browser-util");
const protractor_1 = require("protractor");
let InputSteps = class InputSteps {
    clickStep(all, eltMatch) {
        return __awaiter(this, void 0, void 0, function* () {
            yield browser_util_1.BrowserUtil.safeWait(() => __awaiter(this, void 0, void 0, function* () {
                all ? yield clickAll(eltMatch) : yield click(eltMatch);
            }));
        });
    }
    enterTextStep(clearText, clickText, textMatch, eltMatch) {
        return __awaiter(this, void 0, void 0, function* () {
            yield browser_util_1.BrowserUtil.safeWait(() => __awaiter(this, void 0, void 0, function* () {
                const [text] = yield mapping_1.mapping([textMatch]);
                yield enterText(eltMatch, text, clearText != null && clearText.length > 0, clickText != null && clickText.length > 0);
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
    cucumber_tsflow_1.when(/^I (clear and )?(click into and )?enter (.*) into (.*)$/i),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String]),
    __metadata("design:returntype", Promise)
], InputSteps.prototype, "enterTextStep", null);
InputSteps = __decorate([
    cucumber_tsflow_1.binding()
], InputSteps);
exports.default = InputSteps;
function enterText(field, text, shouldClear, shouldClick) {
    return __awaiter(this, void 0, void 0, function* () {
        const [elt] = yield mapping_1.mapping([field]);
        const finder = yield browser_util_1.BrowserUtil.finder(elt);
        yield finder.scroll();
        yield finder.waitForVisible();
        if (shouldClear) {
            const textValue = yield finder.getValue();
            for (let i = 0; i < textValue.length; i++) {
                yield finder.keys(protractor_1.Key.BACK_SPACE);
            }
        }
        if (shouldClick) {
            yield finder.click();
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
            yield finder.keys(list);
        }
        else {
            yield finder.keys(text);
        }
    });
}
exports.enterText = enterText;
function click(field) {
    return __awaiter(this, void 0, void 0, function* () {
        const elt = yield mapping_1.mapping(field);
        const finder = yield browser_util_1.BrowserUtil.finder(elt);
        yield finder.scroll();
        yield finder.waitForVisible();
        yield finder.click();
    });
}
exports.click = click;
function clickAll(field) {
    return __awaiter(this, void 0, void 0, function* () {
        const elt = yield mapping_1.mapping(field);
        yield yield browser_util_1.BrowserUtil.doAll(elt, (f) => __awaiter(this, void 0, void 0, function* () {
            yield f.scroll();
            yield f.waitForVisible();
            yield f.click();
        }));
    });
}
exports.clickAll = clickAll;
//# sourceMappingURL=input.steps.js.map