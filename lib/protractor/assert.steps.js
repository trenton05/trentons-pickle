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
const mapping_1 = require("../mapping");
const browser_util_1 = require("./browser-util");
const input_steps_1 = require("./input.steps");
const util_1 = require("protractor/built/util");
const textToBePresentInElementInsensitive = (elementFinder, text) => {
    const hasText = () => {
        return elementFinder.getText().then((actualText) => {
            return actualText.replace(/\s+/g, ' ').toLowerCase().indexOf(text.replace(/\s+/g, ' ').toLowerCase()) > -1;
        }, util_1.falseIfMissing);
    };
    return protractor_1.ExpectedConditions.and(protractor_1.ExpectedConditions.presenceOf(elementFinder), hasText);
};
const textToBePresentInElementValueInsensitive = (elementFinder, text) => {
    const hasText = () => {
        return elementFinder.getAttribute('value').then((actualText) => {
            return actualText.replace(/\s+/g, ' ').toLowerCase().indexOf(text.replace(/\s+/g, ' ').toLowerCase()) > -1;
        }, util_1.falseIfMissing);
    };
    return protractor_1.ExpectedConditions.and(protractor_1.ExpectedConditions.presenceOf(elementFinder), hasText);
};
let InputSteps = class InputSteps {
    value(eltMatch, textMatch) {
        return __awaiter(this, void 0, void 0, function* () {
            const [text, elt] = yield mapping_1.mapping([textMatch, eltMatch]);
            const finder = browser_util_1.BrowserUtil.finder(elt);
            yield input_steps_1.scrollIntoView(finder);
            yield protractor_1.browser.wait(textToBePresentInElementValueInsensitive(finder, text));
        });
    }
    text(eltMatch, textMatch) {
        return __awaiter(this, void 0, void 0, function* () {
            const [text, elt] = yield mapping_1.mapping([textMatch, eltMatch]);
            const finder = browser_util_1.BrowserUtil.finder(elt);
            yield input_steps_1.scrollIntoView(finder);
            yield protractor_1.browser.wait(textToBePresentInElementInsensitive(finder, text));
        });
    }
    exactText(eltMatch, textMatch) {
        return __awaiter(this, void 0, void 0, function* () {
            yield browser_util_1.BrowserUtil.safeWait(() => __awaiter(this, void 0, void 0, function* () {
                const [elt, text] = yield mapping_1.mapping([eltMatch, textMatch]);
                const finder = browser_util_1.BrowserUtil.finder(elt);
                yield input_steps_1.scrollIntoView(finder);
                const eltText = yield finder.getText();
                if (text.trim() !== eltText.trim()) {
                    throw new Error(`Text ${text} does not match element ${eltText}`);
                }
            }));
        });
    }
    selectedOption(eltMatch, textMatch) {
        return __awaiter(this, void 0, void 0, function* () {
            const [text, elt] = yield mapping_1.mapping([textMatch, eltMatch]);
            const selected = browser_util_1.BrowserUtil.finder(elt).element(protractor_1.by.css('option:checked'));
            yield input_steps_1.scrollIntoView(selected);
            yield protractor_1.browser.wait(textToBePresentInElementInsensitive(selected, text));
        });
    }
    visible(eltMatch) {
        return __awaiter(this, void 0, void 0, function* () {
            const elt = yield mapping_1.mapping(eltMatch);
            const finder = browser_util_1.BrowserUtil.finder(elt);
            yield protractor_1.browser.wait(protractor_1.ExpectedConditions.visibilityOf(finder));
        });
    }
    enabled(eltMatch) {
        return __awaiter(this, void 0, void 0, function* () {
            yield browser_util_1.BrowserUtil.safeWait(() => __awaiter(this, void 0, void 0, function* () {
                const elt = yield mapping_1.mapping(eltMatch);
                const finder = browser_util_1.BrowserUtil.finder(elt);
                yield input_steps_1.scrollIntoView(finder);
                const isDisabled = yield finder.getAttribute('disabled');
                if (isDisabled) {
                    throw new Error('Still disabled');
                }
            }));
        });
    }
    disabled(eltMatch) {
        return __awaiter(this, void 0, void 0, function* () {
            yield browser_util_1.BrowserUtil.safeWait(() => __awaiter(this, void 0, void 0, function* () {
                const elt = yield mapping_1.mapping(eltMatch);
                const finder = browser_util_1.BrowserUtil.finder(elt);
                yield input_steps_1.scrollIntoView(finder);
                const isDisabled = yield finder.getAttribute('disabled');
                if (!isDisabled) {
                    throw new Error('Still enabled');
                }
            }));
        });
    }
    hidden(eltMatch) {
        return __awaiter(this, void 0, void 0, function* () {
            const elt = yield mapping_1.mapping(eltMatch);
            const finder = browser_util_1.BrowserUtil.finder(elt);
            yield protractor_1.browser.wait(protractor_1.ExpectedConditions.invisibilityOf(finder));
        });
    }
    present(eltMatch) {
        return __awaiter(this, void 0, void 0, function* () {
            yield browser_util_1.BrowserUtil.safeWait(() => __awaiter(this, void 0, void 0, function* () {
                const elt = yield mapping_1.mapping(eltMatch);
                const finder = browser_util_1.BrowserUtil.finder(elt);
                yield input_steps_1.scrollIntoView(finder);
                const present = yield finder.isPresent();
                if (!present) {
                    throw new Error('Still not present');
                }
            }));
        });
    }
    notPresent(eltMatch) {
        return __awaiter(this, void 0, void 0, function* () {
            yield browser_util_1.BrowserUtil.safeWait(() => __awaiter(this, void 0, void 0, function* () {
                const elt = yield mapping_1.mapping(eltMatch);
                const finder = browser_util_1.BrowserUtil.finder(elt);
                const present = yield finder.isPresent();
                if (present) {
                    throw new Error('Still present');
                }
            }));
        });
    }
    isClickable(eltMatch, negationText) {
        return __awaiter(this, void 0, void 0, function* () {
            const elt = yield mapping_1.mapping(eltMatch);
            const finder = browser_util_1.BrowserUtil.finder(elt);
            if (!negationText) {
                yield protractor_1.browser.wait(protractor_1.ExpectedConditions.elementToBeClickable(finder));
            }
            else {
                yield protractor_1.browser.wait(protractor_1.ExpectedConditions.not(protractor_1.ExpectedConditions.elementToBeClickable(finder)));
            }
        });
    }
    checkStep(all, eltMatch, negationText) {
        return __awaiter(this, void 0, void 0, function* () {
            all ? yield this.allChecked(eltMatch, !negationText) : yield this.checked(eltMatch, !negationText);
        });
    }
    checked(eltMatch, checked) {
        return __awaiter(this, void 0, void 0, function* () {
            yield browser_util_1.BrowserUtil.safeWait(() => __awaiter(this, void 0, void 0, function* () {
                const elt = yield mapping_1.mapping(eltMatch);
                const finder = browser_util_1.BrowserUtil.finder(elt);
                yield input_steps_1.scrollIntoView(finder);
                const checkedAttr = yield finder.getAttribute('checked');
                if (checked) {
                    if (!checkedAttr) {
                        throw new Error(`Expected all elements to be checked: '${eltMatch}'`);
                    }
                }
                else {
                    if (checkedAttr) {
                        throw new Error(`Expected all elements to be unchecked: '${eltMatch}'`);
                    }
                }
            }));
        });
    }
    allChecked(eltMatch, checked) {
        return __awaiter(this, void 0, void 0, function* () {
            const elt = yield mapping_1.mapping(eltMatch);
            yield browser_util_1.BrowserUtil.doAll(elt, (f) => __awaiter(this, void 0, void 0, function* () {
                yield input_steps_1.scrollIntoView(f);
                const checkedAttr = yield f.getAttribute('checked');
                if (checked) {
                    if (!checkedAttr) {
                        throw new Error(`Expected all elements to be checked: '${eltMatch}'`);
                    }
                }
                else {
                    if (checkedAttr) {
                        throw new Error(`Expected all elements to be unchecked: '${eltMatch}'`);
                    }
                }
            }));
        });
    }
    before(eltMatch1, eltMatch2) {
        return __awaiter(this, void 0, void 0, function* () {
            yield browser_util_1.BrowserUtil.safeWait(() => __awaiter(this, void 0, void 0, function* () {
                const [elt1, elt2] = yield mapping_1.mapping([eltMatch1, eltMatch2]);
                const finder1 = browser_util_1.BrowserUtil.finder(elt1);
                yield input_steps_1.scrollIntoView(finder1);
                const loc1 = yield finder1.getLocation();
                const finder2 = browser_util_1.BrowserUtil.finder(elt2);
                const loc2 = yield finder2.getLocation();
                if (loc1.y >= loc2.y) {
                    throw new Error('Still below');
                }
            }));
        });
    }
};
__decorate([
    cucumber_tsflow_1.then(/^(.*) has value (.*)$/i),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], InputSteps.prototype, "value", null);
__decorate([
    cucumber_tsflow_1.then(/^(.*) has text (.*)$/i),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], InputSteps.prototype, "text", null);
__decorate([
    cucumber_tsflow_1.then(/^(.*) has exact text (.*)$/i),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], InputSteps.prototype, "exactText", null);
__decorate([
    cucumber_tsflow_1.then(/^(.*) has selected text (.*)$/i),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], InputSteps.prototype, "selectedOption", null);
__decorate([
    cucumber_tsflow_1.then(/^(.*) is visible$/i),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], InputSteps.prototype, "visible", null);
__decorate([
    cucumber_tsflow_1.then(/^(.*) is enabled$/i),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], InputSteps.prototype, "enabled", null);
__decorate([
    cucumber_tsflow_1.then(/^(.*) is disabled$/i),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], InputSteps.prototype, "disabled", null);
__decorate([
    cucumber_tsflow_1.then(/^(.*) is hidden$/i),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], InputSteps.prototype, "hidden", null);
__decorate([
    cucumber_tsflow_1.then(/^(.*) is present$/i),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], InputSteps.prototype, "present", null);
__decorate([
    cucumber_tsflow_1.then(/^(.*) is not present$/i),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], InputSteps.prototype, "notPresent", null);
__decorate([
    cucumber_tsflow_1.then(/^(.*) is (not )?clickable$/i),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], InputSteps.prototype, "isClickable", null);
__decorate([
    cucumber_tsflow_1.then(/^(all )?(?:of )?(.*) (?:is|are) (not |un)?checked$/i),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Boolean, String, String]),
    __metadata("design:returntype", Promise)
], InputSteps.prototype, "checkStep", null);
__decorate([
    cucumber_tsflow_1.then(/^(.*) appears above (.*)$/i),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], InputSteps.prototype, "before", null);
InputSteps = __decorate([
    cucumber_tsflow_1.binding()
], InputSteps);
exports.default = InputSteps;
//# sourceMappingURL=assert.steps.js.map