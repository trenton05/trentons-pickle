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
Object.defineProperty(exports, "__esModule", { value: true });
const cucumber_tsflow_1 = require("cucumber-tsflow");
const mapping_1 = require("../mapping");
const protractor_1 = require("protractor");
const browser_util_1 = require("./browser-util");
const cssContainingTextInsensitive = (cssSelector, searchText, using) => {
    using = using || document;
    const elements = using.querySelectorAll(cssSelector);
    const matches = [];
    elements.forEach((e) => {
        let elementText = (e.textContent || e.innerText || '');
        for (let i = 0; i < e.attributes.length; i++) {
            elementText += ' ' + e.attributes[i].value;
        }
        if (elementText.replace(/\s+/g, ' ').toLowerCase().indexOf(searchText.replace(/\s+/g, ' ').toLowerCase()) > -1) {
            let parent = e.parentNode;
            while (parent && matches.length > 0 && matches[matches.length - 1] !== parent) {
                parent = parent.parentNode;
            }
            if (parent && matches.length > 0) {
                matches.pop();
            }
            matches.push(e);
        }
    });
    return matches;
};
protractor_1.by.addLocator('cssContainingTextInsensitive', cssContainingTextInsensitive);
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
protractor_1.by.addLocator('cssContainingInputWithValue', cssContainingInputWithValue);
mapping_1.mapping('button', 'button');
mapping_1.mapping('text area', 'textarea');
mapping_1.mapping('input', 'input');
mapping_1.mapping('text input', 'input[type=text]');
mapping_1.mapping('checkbox', 'input[type=checkbox]');
mapping_1.mapping('image', 'img');
mapping_1.mapping('radio button', 'input[type=radio]');
mapping_1.mapping('div', 'div');
mapping_1.mapping('span', 'span');
mapping_1.mapping('element', '*');
mapping_1.mapping('paragraph', 'p');
mapping_1.mapping('option', 'option');
mapping_1.mapping('select', 'select');
let CssSteps = class CssSteps {
    static elementIndex(index, elementMatch) {
        return mapping_1.mapping(elementMatch).then((elt) => {
            const array = protractor_1.$$(elt);
            return array.get(parseInt(index, 10) - 1);
        });
    }
    static elementInIndex(index, cssMatch, elementMatch) {
        return mapping_1.mapping([cssMatch, elementMatch]).then(([css, elt]) => {
            const finder = browser_util_1.BrowserUtil.finder(elt);
            const array = finder.all(protractor_1.by.css(css));
            return array.get(parseInt(index, 10) - 1);
        });
    }
    static elementWithTextIndex(index, elementMatch, textMatch) {
        return mapping_1.mapping([elementMatch, textMatch]).then(([elt, text]) => {
            const array = protractor_1.element.all(protractor_1.by['cssContainingTextInsensitive'](elt, text));
            return array.get(parseInt(index, 10) - 1);
        });
    }
    static cssIndex(indexMatch, elementMatch) {
        return mapping_1.mapping([indexMatch, elementMatch]).then(([index, elt]) => {
            const finder = browser_util_1.BrowserUtil.finder(elt);
            return finder.element(protractor_1.by.css(index));
        });
    }
    static cssTextIndex(indexMatch, textMatch, elementMatch) {
        return mapping_1.mapping([indexMatch, textMatch, elementMatch]).then(([index, text, elt]) => {
            const finder = elt instanceof protractor_1.ElementFinder ? elt : protractor_1.$(elt);
            return finder.element(protractor_1.by['cssContainingTextInsensitive'](index, text));
        });
    }
    static cssWithTextIndex(cssMatch, textMatch) {
        return mapping_1.mapping([textMatch, cssMatch]).then(([text, css]) => {
            return protractor_1.element(protractor_1.by['cssContainingTextInsensitive'](css, text));
        });
    }
    static cssWithValueIndex(cssMatch, valueMatch) {
        return mapping_1.mapping([valueMatch, cssMatch]).then(([value, css]) => {
            return protractor_1.element(protractor_1.by['cssContainingInputWithValue'](css, value));
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