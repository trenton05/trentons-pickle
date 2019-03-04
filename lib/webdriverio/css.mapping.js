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
const cssContainingTextInsensitive = (cssSelector, searchText, using) => __awaiter(this, void 0, void 0, function* () {
    const elements = using ? yield using.$$(cssSelector) : yield browser.$$(cssSelector);
    const matches = [];
    yield Promise.all(elements.map((e) => __awaiter(this, void 0, void 0, function* () {
        const elementText = (yield e.getText()) + ' ' + ((yield e.getAttribute('text')) || '');
        if (elementText.replace(/\s+/g, ' ').toLowerCase().indexOf(searchText.replace(/\s+/g, ' ').toLowerCase()) > -1) {
            let parent = yield e.frameParent();
            while (parent && matches.length > 0 && matches[matches.length - 1] !== parent) {
                parent = yield parent.frameParent();
            }
            if (parent && matches.length > 0) {
                matches.pop();
            }
            matches.push(e);
        }
    })));
    return matches;
});
const cssContainingInputWithValue = (cssSelector, searchText, using) => __awaiter(this, void 0, void 0, function* () {
    const elements = using ? yield using.$$(cssSelector) : yield browser.$$(cssSelector);
    const matches = [];
    elements.forEach((e) => {
        const elementValue = e.getValue();
        if (elementValue.indexOf(searchText) > -1) {
            matches.push(e);
        }
    });
    return matches;
});
mapping_1.mapping('text', 'Text');
let CssSteps = class CssSteps {
    static elementIndex(index, elementMatch) {
        return __awaiter(this, void 0, void 0, function* () {
            const elt = yield mapping_1.mapping(elementMatch);
            const array = yield browser.$$(elt);
            return array[parseInt(index, 10) - 1];
        });
    }
    static elementInIndex(index, cssMatch, elementMatch) {
        return __awaiter(this, void 0, void 0, function* () {
            const css = yield mapping_1.mapping(cssMatch);
            const elt = yield mapping_1.mapping(elementMatch);
            const finder = yield browser_util_1.BrowserUtil.finder(elt);
            const array = yield finder.$$(css);
            return array[parseInt(index, 10) - 1];
        });
    }
    static elementWithTextIndex(index, elementMatch, textMatch) {
        return __awaiter(this, void 0, void 0, function* () {
            const elt = yield mapping_1.mapping(elementMatch);
            const text = yield mapping_1.mapping(textMatch);
            const array = yield cssContainingTextInsensitive(elt, text);
            return array[parseInt(index, 10) - 1];
        });
    }
    static cssIndex(indexMatch, elementMatch) {
        return __awaiter(this, void 0, void 0, function* () {
            const elt = yield mapping_1.mapping(elementMatch);
            const index = yield mapping_1.mapping(indexMatch);
            const finder = yield browser_util_1.BrowserUtil.finder(elt);
            return yield finder.$(index);
        });
    }
    static cssTextIndex(indexMatch, textMatch, elementMatch) {
        return __awaiter(this, void 0, void 0, function* () {
            const elt = yield mapping_1.mapping(elementMatch);
            const text = yield mapping_1.mapping(textMatch);
            const index = yield mapping_1.mapping(indexMatch);
            const finder = yield browser_util_1.BrowserUtil.finder(elt);
            return (yield cssContainingTextInsensitive(index, text, finder))[0];
        });
    }
    static cssWithTextIndex(cssMatch, textMatch) {
        return __awaiter(this, void 0, void 0, function* () {
            const css = yield mapping_1.mapping(cssMatch);
            const text = yield mapping_1.mapping(textMatch);
            return (yield cssContainingTextInsensitive(css, text))[0];
        });
    }
    static cssWithValueIndex(cssMatch, valueMatch) {
        return __awaiter(this, void 0, void 0, function* () {
            const css = yield mapping_1.mapping(cssMatch);
            const value = yield mapping_1.mapping(valueMatch);
            return (yield cssContainingInputWithValue(css, value))[0];
        });
    }
};
__decorate([
    mapping_1.mapping(/^The ([0-9]+)(?:st|nd|rd|th) (.*)$/i),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], CssSteps, "elementIndex", null);
__decorate([
    mapping_1.mapping(/^The ([0-9]+)(?:st|nd|rd|th) (.*?) in (.*)$/i),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], CssSteps, "elementInIndex", null);
__decorate([
    mapping_1.mapping(/^The ([0-9]+)(?:st|nd|rd|th) (.*?) with text (.*)$/i),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], CssSteps, "elementWithTextIndex", null);
__decorate([
    mapping_1.mapping(/^The (.*?) in (.*)$/i),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], CssSteps, "cssIndex", null);
__decorate([
    mapping_1.mapping(/^The (.*?) with text (.*?) in (.*)$/i),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], CssSteps, "cssTextIndex", null);
__decorate([
    mapping_1.mapping(/^The (.*?) with text (.*)$/i),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], CssSteps, "cssWithTextIndex", null);
__decorate([
    mapping_1.mapping(/^The (.*?) with value (.*)$/i),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], CssSteps, "cssWithValueIndex", null);
CssSteps = __decorate([
    cucumber_tsflow_1.binding()
], CssSteps);
exports.default = CssSteps;
//# sourceMappingURL=css.mapping.js.map