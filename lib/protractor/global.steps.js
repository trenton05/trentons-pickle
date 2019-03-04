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
const protractor_1 = require("protractor");
const Chance = require("chance");
const browser_util_1 = require("./browser-util");
const chance = new Chance();
let GlobalSteps = class GlobalSteps {
    static randomMapping(type, ...props) {
        return __awaiter(this, void 0, void 0, function* () {
            const options = {};
            for (let i = 0; i < props.length; i += 2) {
                const v = props[i + 1];
                options[props[i]] = !isNaN(Number(v)) ? Number(v) : v === 'true' ? true : v === 'false' ? false : v;
            }
            return chance[type](options);
        });
    }
    navigate(pageMatch) {
        return __awaiter(this, void 0, void 0, function* () {
            const page = yield mapping_1.mapping(pageMatch);
            yield protractor_1.browser.get(page);
        });
    }
    contains(pageMatch) {
        return __awaiter(this, void 0, void 0, function* () {
            const page = yield mapping_1.mapping(pageMatch);
            yield protractor_1.browser.wait(protractor_1.ExpectedConditions.urlContains(page));
        });
    }
    loaded(pageMatch) {
        return __awaiter(this, void 0, void 0, function* () {
            let page = yield mapping_1.mapping(pageMatch);
            page = protractor_1.browser.baseUrl + page;
            yield protractor_1.browser.wait(protractor_1.ExpectedConditions.urlIs(page));
        });
    }
    randomString(type, name) {
        return __awaiter(this, void 0, void 0, function* () {
            let val = yield mapping_1.mapping(`random ${type}`);
            return mapping_1.mapping(name, val);
        });
    }
    assignText(type, name) {
        return __awaiter(this, void 0, void 0, function* () {
            yield browser_util_1.BrowserUtil.safeWait(() => __awaiter(this, void 0, void 0, function* () {
                const elt = yield mapping_1.mapping(type);
                const finder = browser_util_1.BrowserUtil.finder(elt);
                const text = yield finder.getText();
                mapping_1.mapping(name, text);
            }));
        });
    }
    assignValue(type, name) {
        return __awaiter(this, void 0, void 0, function* () {
            yield browser_util_1.BrowserUtil.safeWait(() => __awaiter(this, void 0, void 0, function* () {
                const elt = yield mapping_1.mapping(type);
                const finder = browser_util_1.BrowserUtil.finder(elt);
                const text = yield finder.getAttribute('value');
                mapping_1.mapping(name, text);
            }));
        });
    }
    reloadPage() {
        return __awaiter(this, void 0, void 0, function* () {
            yield protractor_1.browser.driver.navigate().refresh();
        });
    }
};
__decorate([
    cucumber_tsflow_1.when(/^I navigate to (.*)$/i),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GlobalSteps.prototype, "navigate", null);
__decorate([
    cucumber_tsflow_1.then(/^(.*) is in the url/i),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GlobalSteps.prototype, "contains", null);
__decorate([
    cucumber_tsflow_1.then(/^(.*) is the url/i),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GlobalSteps.prototype, "loaded", null);
__decorate([
    cucumber_tsflow_1.given(/^Random (.*) as (.*)$/i),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], GlobalSteps.prototype, "randomString", null);
__decorate([
    cucumber_tsflow_1.given(/^The text in (.*) as (.*)$/i),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], GlobalSteps.prototype, "assignText", null);
__decorate([
    cucumber_tsflow_1.given(/^The value in (.*) as (.*)$/i),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], GlobalSteps.prototype, "assignValue", null);
__decorate([
    cucumber_tsflow_1.when(/^I (?:reload|refresh) the page$/i),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], GlobalSteps.prototype, "reloadPage", null);
__decorate([
    mapping_1.mapping(/^(?:a |an |the )?random ([^ ]*)(?: (?:with |and )([^ ]+) ([^ ]+))*$/i),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], GlobalSteps, "randomMapping", null);
GlobalSteps = __decorate([
    cucumber_tsflow_1.binding()
], GlobalSteps);
exports.default = GlobalSteps;
//# sourceMappingURL=global.steps.js.map