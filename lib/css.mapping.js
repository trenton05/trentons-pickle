var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { binding } from 'cucumber-tsflow';
import { mapping } from '../mapping';
import { $, $$, by, element, ElementFinder } from 'protractor';
import { BrowserUtil } from '../browser-util';
const cssContainingTextInsensitive = (cssSelector, searchText, using) => {
    using = using || document;
    const elements = using.querySelectorAll(cssSelector);
    const matches = [];
    elements.forEach((e) => {
        const elementText = e.textContent || e.innerText || '';
        if (elementText.replace(/\s+/g, ' ').toLowerCase().indexOf(searchText.replace(/\s+/g, ' ').toLowerCase()) > -1) {
            matches.push(e);
        }
    });
    return matches;
};
by.addLocator('cssContainingTextInsensitive', cssContainingTextInsensitive);
const cssContainingInputWithValue = (cssSelector, searchText, using) => {
    using = using || document;
    const elements = using.querySelectorAll(cssSelector);
    const matches = [];
    elements.forEach((e) => {
        const inputs = e.querySelectorAll('input');
        inputs.forEach((i) => {
            const elementValue = i.value || '';
            if (elementValue.indexOf(searchText) > -1) {
                matches.push(e);
            }
        });
    });
    return matches;
};
by.addLocator('cssContainingInputWithValue', cssContainingInputWithValue);
let CssSteps = class CssSteps {
    static elementIndex(index, elementMatch) {
        return mapping(elementMatch).then((elt) => {
            const array = $$(elt);
            return array.get(parseInt(index, 10) - 1);
        });
    }
    static elementInIndex(index, cssMatch, elementMatch) {
        return mapping([cssMatch, elementMatch]).then(([css, elt]) => {
            const finder = BrowserUtil.finder(elt);
            const array = finder.all(by.css(css));
            return array.get(parseInt(index, 10) - 1);
        });
    }
    static elementWithTextIndex(index, elementMatch, textMatch) {
        return mapping([elementMatch, textMatch]).then(([elt, text]) => {
            const array = element.all(by['cssContainingTextInsensitive'](elt, text));
            return array.get(parseInt(index, 10) - 1);
        });
    }
    static cssIndex(indexMatch, elementMatch) {
        return mapping([indexMatch, elementMatch]).then(([index, elt]) => {
            const finder = BrowserUtil.finder(elt);
            return finder.element(by.css(index));
        });
    }
    static cssTextIndex(indexMatch, textMatch, elementMatch) {
        return mapping([indexMatch, textMatch, elementMatch]).then(([index, text, elt]) => {
            const finder = elt instanceof ElementFinder ? elt : $(elt);
            return finder.element(by['cssContainingTextInsensitive'](index, text));
        });
    }
    static cssWithTextIndex(cssMatch, textMatch) {
        return mapping([textMatch, cssMatch]).then(([text, css]) => {
            return element(by['cssContainingTextInsensitive'](css, text));
        });
    }
    static cssWithValueIndex(cssMatch, valueMatch) {
        return mapping([valueMatch, cssMatch]).then(([value, css]) => {
            return element(by['cssContainingInputWithValue'](css, value));
        });
    }
};
__decorate([
    mapping(/^The ([0-9]+)(?:st|nd|rd|th) (.*)$/i),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], CssSteps, "elementIndex", null);
__decorate([
    mapping(/^The ([0-9]+)(?:st|nd|rd|th) (.*?) in (.*)$/i),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], CssSteps, "elementInIndex", null);
__decorate([
    mapping(/^The ([0-9]+)(?:st|nd|rd|th) (.*?) with text (.*)$/i),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], CssSteps, "elementWithTextIndex", null);
__decorate([
    mapping(/^The (.*?) in (.*)$/i),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], CssSteps, "cssIndex", null);
__decorate([
    mapping(/^The (.*?) with text (.*?) in (.*)$/i),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], CssSteps, "cssTextIndex", null);
__decorate([
    mapping(/^The (.*?) with text (.*)$/i),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], CssSteps, "cssWithTextIndex", null);
__decorate([
    mapping(/^The (.*?) with value (.*)$/i),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], CssSteps, "cssWithValueIndex", null);
CssSteps = __decorate([
    binding()
], CssSteps);
export default CssSteps;
//# sourceMappingURL=css.mapping.js.map