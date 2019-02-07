import { ElementFinder } from 'protractor';
import { WebElement } from 'selenium-webdriver';
export default class InputSteps {
    clickStep(all: boolean, eltMatch: string): Promise<void>;
    hover(eltMatch: string): Promise<void>;
    hoverWithTextAndClickElement(inputMatch: string, textMatch: string, clickMatch: string): Promise<void>;
    enterTextStep(clearText: string, clickText: string, textMatch: string, eltMatch: string): Promise<void>;
    sendFile(textMatch: string, eltMatch: string): Promise<void>;
    select(theMatch: string, textMatch: string, eltMatch: string): Promise<void>;
    hitEnter(eltMatch: string): Promise<void>;
    changeCheckboxValue(negate: string, eltMatch: string): Promise<void>;
}
export declare function enterText(field: string, text: string, shouldClear: boolean, shouldClick: boolean): Promise<any>;
export declare function click(field: string): Promise<any>;
export declare function clickAll(field: string): Promise<any>;
export declare function scrollIntoView(el: WebElement | ElementFinder): Promise<void>;
