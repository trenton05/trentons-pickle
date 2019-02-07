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
const textToBePresentInElementInsensitive = (elementFinder, text) => {
    const hasText = () => {
        return elementFinder.getText().then((actualText) => {
            return actualText.replace(/\s+/g, ' ').toLowerCase().indexOf(text.replace(/\s+/g, ' ').toLowerCase()) > -1;
        });
    };
    return hasText;
};
const textToBePresentInElementValueInsensitive = (elementFinder, text) => {
    const hasText = () => {
        return elementFinder.getValue().then((actualText) => {
            return actualText.replace(/\s+/g, ' ').toLowerCase().indexOf(text.replace(/\s+/g, ' ').toLowerCase()) > -1;
        });
    };
    return hasText;
};
let InputSteps = class InputSteps {
    value(eltMatch, textMatch) {
        return __awaiter(this, void 0, void 0, function* () {
            const [text, elt] = yield mapping_1.mapping([textMatch, eltMatch]);
            const finder = browser_util_1.BrowserUtil.finder(elt);
            yield finder.scroll();
            yield browser_util_1.BrowserUtil.safeWait(textToBePresentInElementValueInsensitive(finder, text));
        });
    }
    text(eltMatch, textMatch) {
        return __awaiter(this, void 0, void 0, function* () {
            const [text, elt] = yield mapping_1.mapping([textMatch, eltMatch]);
            const finder = browser_util_1.BrowserUtil.finder(elt);
            yield finder.scroll();
            yield browser_util_1.BrowserUtil.safeWait(textToBePresentInElementInsensitive(finder, text));
        });
    }
    exactText(eltMatch, textMatch) {
        return __awaiter(this, void 0, void 0, function* () {
            yield browser_util_1.BrowserUtil.safeWait(() => __awaiter(this, void 0, void 0, function* () {
                const [elt, text] = yield mapping_1.mapping([eltMatch, textMatch]);
                const finder = browser_util_1.BrowserUtil.finder(elt);
                yield finder.scroll();
                const eltText = yield finder.getText();
                if (text.trim() !== eltText.trim()) {
                    throw new Error(`Text ${text} does not match element ${eltText}`);
                }
            }));
        });
    }
    visible(eltMatch) {
        return __awaiter(this, void 0, void 0, function* () {
            const elt = yield mapping_1.mapping(eltMatch);
            const finder = browser_util_1.BrowserUtil.finder(elt);
            yield browser_util_1.BrowserUtil.safeWait(() => finder.isVisible());
        });
    }
    enabled(eltMatch) {
        return __awaiter(this, void 0, void 0, function* () {
            yield browser_util_1.BrowserUtil.safeWait(() => __awaiter(this, void 0, void 0, function* () {
                const elt = yield mapping_1.mapping(eltMatch);
                const finder = browser_util_1.BrowserUtil.finder(elt);
                yield finder.scroll();
                const isEnabled = yield finder.isEnabled();
                if (!isEnabled) {
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
                yield finder.scroll();
                const isEnabled = yield finder.isEnabled();
                if (isEnabled) {
                    throw new Error('Still enabled');
                }
            }));
        });
    }
    hidden(eltMatch) {
        return __awaiter(this, void 0, void 0, function* () {
            const elt = yield mapping_1.mapping(eltMatch);
            const finder = browser_util_1.BrowserUtil.finder(elt);
            yield browser_util_1.BrowserUtil.safeWait(() => !finder.isVisible());
        });
    }
    present(eltMatch) {
        return __awaiter(this, void 0, void 0, function* () {
            yield browser_util_1.BrowserUtil.safeWait(() => __awaiter(this, void 0, void 0, function* () {
                const elt = yield mapping_1.mapping(eltMatch);
                const finder = browser_util_1.BrowserUtil.finder(elt);
                yield finder.scroll();
                const present = yield finder.isExisting();
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
                const present = yield finder.isExisting();
                if (present) {
                    throw new Error('Still present');
                }
            }));
        });
    }
    before(eltMatch1, eltMatch2) {
        return __awaiter(this, void 0, void 0, function* () {
            yield browser_util_1.BrowserUtil.safeWait(() => __awaiter(this, void 0, void 0, function* () {
                const [elt1, elt2] = yield mapping_1.mapping([eltMatch1, eltMatch2]);
                const finder1 = browser_util_1.BrowserUtil.finder(elt1);
                yield finder1.scroll();
                const loc1 = yield finder1.getLocation('y');
                const finder2 = browser_util_1.BrowserUtil.finder(elt2);
                const loc2 = yield finder2.getLocation('y');
                if (loc1.valueOf() >= loc2.valueOf()) {
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