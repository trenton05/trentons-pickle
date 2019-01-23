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
import { binding, then } from 'cucumber-tsflow';
import { browser, ExpectedConditions, by } from 'protractor';
import { mapping } from './mapping';
import { BrowserUtil } from './browser-util';
import { scrollIntoView } from './input.steps';
import { falseIfMissing } from 'protractor/built/util';
const textToBePresentInElementInsensitive = (elementFinder, text) => {
    const hasText = () => {
        return elementFinder.getText().then((actualText) => {
            return actualText.replace(/\s+/g, ' ').toLowerCase().indexOf(text.replace(/\s+/g, ' ').toLowerCase()) > -1;
        }, falseIfMissing);
    };
    return ExpectedConditions.and(ExpectedConditions.presenceOf(elementFinder), hasText);
};
const textToBePresentInElementValueInsensitive = (elementFinder, text) => {
    const hasText = () => {
        return elementFinder.getAttribute('value').then((actualText) => {
            return actualText.replace(/\s+/g, ' ').toLowerCase().indexOf(text.replace(/\s+/g, ' ').toLowerCase()) > -1;
        }, falseIfMissing);
    };
    return ExpectedConditions.and(ExpectedConditions.presenceOf(elementFinder), hasText);
};
let InputSteps = class InputSteps {
    value(eltMatch, textMatch) {
        return __awaiter(this, void 0, void 0, function* () {
            const [text, elt] = yield mapping([textMatch, eltMatch]);
            const finder = BrowserUtil.finder(elt);
            yield scrollIntoView(finder);
            yield browser.wait(textToBePresentInElementValueInsensitive(finder, text));
        });
    }
    text(eltMatch, textMatch) {
        return __awaiter(this, void 0, void 0, function* () {
            const [text, elt] = yield mapping([textMatch, eltMatch]);
            const finder = BrowserUtil.finder(elt);
            yield scrollIntoView(finder);
            yield browser.wait(textToBePresentInElementInsensitive(finder, text));
        });
    }
    exactText(eltMatch, textMatch) {
        return __awaiter(this, void 0, void 0, function* () {
            yield BrowserUtil.safeWait(() => __awaiter(this, void 0, void 0, function* () {
                const [elt, text] = yield mapping([eltMatch, textMatch]);
                const finder = BrowserUtil.finder(elt);
                yield scrollIntoView(finder);
                const eltText = yield finder.getText();
                if (text.trim() !== eltText.trim()) {
                    throw new Error(`Text ${text} does not match element ${eltText}`);
                }
            }));
        });
    }
    selectedOption(eltMatch, textMatch) {
        return __awaiter(this, void 0, void 0, function* () {
            const [text, elt] = yield mapping([textMatch, eltMatch]);
            const selected = BrowserUtil.finder(elt).element(by.css('option:checked'));
            yield scrollIntoView(selected);
            yield browser.wait(textToBePresentInElementInsensitive(selected, text));
        });
    }
    visible(eltMatch) {
        return __awaiter(this, void 0, void 0, function* () {
            const elt = yield mapping(eltMatch);
            const finder = BrowserUtil.finder(elt);
            yield browser.wait(ExpectedConditions.visibilityOf(finder));
        });
    }
    enabled(eltMatch) {
        return __awaiter(this, void 0, void 0, function* () {
            yield BrowserUtil.safeWait(() => __awaiter(this, void 0, void 0, function* () {
                const elt = yield mapping(eltMatch);
                const finder = BrowserUtil.finder(elt);
                yield scrollIntoView(finder);
                const isDisabled = yield finder.getAttribute('disabled');
                if (isDisabled) {
                    throw new Error('Still disabled');
                }
            }));
        });
    }
    disabled(eltMatch) {
        return __awaiter(this, void 0, void 0, function* () {
            yield BrowserUtil.safeWait(() => __awaiter(this, void 0, void 0, function* () {
                const elt = yield mapping(eltMatch);
                const finder = BrowserUtil.finder(elt);
                yield scrollIntoView(finder);
                const isDisabled = yield finder.getAttribute('disabled');
                if (!isDisabled) {
                    throw new Error('Still enabled');
                }
            }));
        });
    }
    hidden(eltMatch) {
        return __awaiter(this, void 0, void 0, function* () {
            const elt = yield mapping(eltMatch);
            const finder = BrowserUtil.finder(elt);
            yield browser.wait(ExpectedConditions.invisibilityOf(finder));
        });
    }
    present(eltMatch) {
        return __awaiter(this, void 0, void 0, function* () {
            yield BrowserUtil.safeWait(() => __awaiter(this, void 0, void 0, function* () {
                const elt = yield mapping(eltMatch);
                const finder = BrowserUtil.finder(elt);
                yield scrollIntoView(finder);
                const present = yield finder.isPresent();
                if (!present) {
                    throw new Error('Still not present');
                }
            }));
        });
    }
    notPresent(eltMatch) {
        return __awaiter(this, void 0, void 0, function* () {
            yield BrowserUtil.safeWait(() => __awaiter(this, void 0, void 0, function* () {
                const elt = yield mapping(eltMatch);
                const finder = BrowserUtil.finder(elt);
                const present = yield finder.isPresent();
                if (present) {
                    throw new Error('Still present');
                }
            }));
        });
    }
    isClickable(eltMatch, negationText) {
        return __awaiter(this, void 0, void 0, function* () {
            const elt = yield mapping(eltMatch);
            const finder = BrowserUtil.finder(elt);
            if (!negationText) {
                yield browser.wait(ExpectedConditions.elementToBeClickable(finder));
            }
            else {
                yield browser.wait(ExpectedConditions.not(ExpectedConditions.elementToBeClickable(finder)));
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
            yield BrowserUtil.safeWait(() => __awaiter(this, void 0, void 0, function* () {
                const elt = yield mapping(eltMatch);
                const finder = BrowserUtil.finder(elt);
                yield scrollIntoView(finder);
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
            const elt = yield mapping(eltMatch);
            yield BrowserUtil.doAll(elt, (f) => __awaiter(this, void 0, void 0, function* () {
                yield scrollIntoView(f);
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
            yield BrowserUtil.safeWait(() => __awaiter(this, void 0, void 0, function* () {
                const [elt1, elt2] = yield mapping([eltMatch1, eltMatch2]);
                const finder1 = BrowserUtil.finder(elt1);
                yield scrollIntoView(finder1);
                const loc1 = yield finder1.getLocation();
                const finder2 = BrowserUtil.finder(elt2);
                const loc2 = yield finder2.getLocation();
                if (loc1.y >= loc2.y) {
                    throw new Error('Still below');
                }
            }));
        });
    }
};
__decorate([
    then(/^(.*) has value (.*)$/i),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], InputSteps.prototype, "value", null);
__decorate([
    then(/^(.*) has text (.*)$/i),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], InputSteps.prototype, "text", null);
__decorate([
    then(/^(.*) has exact text (.*)$/i),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], InputSteps.prototype, "exactText", null);
__decorate([
    then(/^(.*) has selected text (.*)$/i),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], InputSteps.prototype, "selectedOption", null);
__decorate([
    then(/^(.*) is visible$/i),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], InputSteps.prototype, "visible", null);
__decorate([
    then(/^(.*) is enabled$/i),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], InputSteps.prototype, "enabled", null);
__decorate([
    then(/^(.*) is disabled$/i),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], InputSteps.prototype, "disabled", null);
__decorate([
    then(/^(.*) is hidden$/i),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], InputSteps.prototype, "hidden", null);
__decorate([
    then(/^(.*) is present$/i),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], InputSteps.prototype, "present", null);
__decorate([
    then(/^(.*) is not present$/i),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], InputSteps.prototype, "notPresent", null);
__decorate([
    then(/^(.*) is (not )?clickable$/i),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], InputSteps.prototype, "isClickable", null);
__decorate([
    then(/^(all )?(?:of )?(.*) (?:is|are) (not |un)?checked$/i),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Boolean, String, String]),
    __metadata("design:returntype", Promise)
], InputSteps.prototype, "checkStep", null);
__decorate([
    then(/^(.*) appears above (.*)$/i),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], InputSteps.prototype, "before", null);
InputSteps = __decorate([
    binding()
], InputSteps);
export default InputSteps;
//# sourceMappingURL=assert.steps.js.map