import { binding, when } from 'cucumber-tsflow';
import { browser, by, element, ElementFinder, ExpectedConditions, Key } from 'protractor';

import { mapping } from '../mapping';
import { BrowserUtil } from './browser-util';
import { WebElement } from 'selenium-webdriver';
import * as path from 'path';

@binding()
export default class InputSteps {

  @when(/^I click (all )?(?:of )?(.*)$/i)
  public async clickStep(all: boolean, eltMatch: string): Promise<void> {
    all ? await clickAll(eltMatch) : await click(eltMatch);
  }

  @when(/^I move my mouse over (.*) and down (.*?)( and click)?$/i)
  public async movePosition(x: string, y: string, click: boolean): Promise<void> {
    const result = browser.actions().mouseMove({x: Number(await mapping(x)), y: Number(await mapping(y))});
    await (click ? result.click() : result).perform();
  }

  @when(/^I move my mouse to (.*?)( and click)?$/i)
  public async moveElement(eltMatch: string, click: boolean): Promise<void> {
    const finder = BrowserUtil.finder(await mapping(eltMatch));
    const result = browser.actions().mouseMove(finder);
    await (click ? result.click() : result).perform();
  }

  @when(/^I hover over (.*)$/i)
  public async hover(eltMatch: string): Promise<void> {
    const waitForAngular: boolean = await browser.waitForAngularEnabled();
    if (waitForAngular) {
      await browser.waitForAngularEnabled(false);
    }
    await BrowserUtil.safeWait(async () => {
      const elt: any = await mapping(eltMatch);
      const finder = BrowserUtil.finder(elt);
      await browser.actions().mouseMove(finder).perform();
    });
    await browser.waitForAngularEnabled(waitForAngular);
  }

  @when(/^I hover (.*) with text (.*) and click (.*)$/i)
  public async hoverWithTextAndClickElement(inputMatch: string, textMatch: string, clickMatch: string): Promise<void> {
    await BrowserUtil.safeWait(async () => {
      const [input, text, click]: [string, string, string] = await mapping([inputMatch, textMatch, clickMatch]);
      const result = await browser.findElement(by.cssContainingText(input, text));
      await browser.actions().mouseMove(result).perform();
      await browser.actions().click(await result.findElement(by.css(click))).perform();
    });
  }

  @when(/^I (clear and )?(click into and )?enter (.*) into (.*)$/i)
  public async enterTextStep(clearText: string, clickText: string, textMatch: string, eltMatch: string): Promise<void> {
    const [text]: [string] = await mapping([textMatch]);
    await enterText(eltMatch, text, clearText != null && clearText.length > 0, clickText != null && clickText.length > 0);
  }

  @when(/^I send file (.*) to (.*)$/i)
  public async sendFile(textMatch: string, eltMatch: string): Promise<void> {
    await BrowserUtil.safeWait(async () => {
      const text = await mapping(textMatch);
      const elt: any = await mapping(eltMatch);
      const finder = BrowserUtil.finder(elt);
      await scrollIntoView(finder);
      const web = await finder.getWebElement();
      await web.sendKeys(path.resolve(process.cwd(), text));
    });
  }

  @when(/^I select( the)? (.*) option from (.*)$/i)
  public async select(theMatch: string, textMatch: string, eltMatch: string): Promise<void> {
    const [text, elt]: [string, string] = await mapping([textMatch, eltMatch]);
    const finder: ElementFinder = BrowserUtil.finder(elt).element(by.cssContainingTextInsensitive('option', text));
    await browser.wait(ExpectedConditions.presenceOf(finder));
    const elem = await finder.getWebElement();
    await scrollIntoView(elem);
    await elem.click();
  }

  @when(/^I hit enter on (.*)$/i)
  public async hitEnter(eltMatch: string): Promise<void> {
    const elt: any = await mapping(eltMatch);
    const finder = BrowserUtil.finder(elt);
    await scrollIntoView(finder);
    await browser.wait(ExpectedConditions.visibilityOf(finder));
    const web = await finder.getWebElement();
    await web.click();
    await web.sendKeys(Key.ENTER);
  }

  @when(/^I (un)?check the (.*)$/i)
  public async changeCheckboxValue(negate: string, eltMatch: string): Promise<void> {
    await BrowserUtil.safeWait(async () => {
      const elt: any = await mapping(eltMatch);
      const finder = BrowserUtil.finder(elt);
      const checkedAttr = await finder.getAttribute('checked');
      if (Boolean(checkedAttr) === Boolean(negate)) {
        await click(eltMatch);
      }
    });
  }

}

export async function enterText(field: string, text: string, shouldClear: boolean, shouldClick: boolean): Promise<any> {
  const [elt]: [string] = await mapping([field]);
  const finder = BrowserUtil.finder(elt);
  await scrollIntoView(finder);
  await browser.wait(ExpectedConditions.visibilityOf(finder));
  const web = await finder.getWebElement();
  if (shouldClear) {
    await web.clear();
    await web.sendKeys('1');

    const textValue = await web.getAttribute('value');
    for (let i = 0; i < textValue.length; i++) {
      await web.sendKeys(Key.BACK_SPACE);
    }
  }

  if (shouldClick) {
    await web.click();
  }

  const reg = /(CTRL\+|ALT\+|SHIFT\+)*(.\+)*(ARROW_UP|ARROW_DOWN|SPACE|ENTER|.)/g;
  const list: Array<any> = [];
  while (true) {
    const match = reg.exec(text);
    if (!match) {
      break;
    }
    if (match[0].length === 1) {
      list.push(match[0]);
    } else {
      const parts = match[0].split(/\+/);
      for (let i = 0; i < parts.length; i++) {
        const part = parts[i].toLowerCase();
        parts[i] = part === 'ctrl' ? Key.CONTROL : part.length > 1 ? Key[part.toUpperCase()] : part;
      }
      list.push(parts.length === 1 ? parts[0] : Key.chord.apply(Key, parts));
    }
  }

  if (list.length > 0) {
    await web.sendKeys.apply(web, list);
  } else {
    await web.sendKeys(text);
  }
}

export async function click(field: string): Promise<any> {
  const elt: any = await mapping(field);
  const finder = BrowserUtil.finder(elt);
  await scrollIntoView(finder);
  await browser.wait(ExpectedConditions.elementToBeClickable(finder));
  const web: WebElement = await finder.getWebElement();
  await web.click();
}

export async function clickAll(field: string): Promise<any> {
  const elt: any = await mapping(field);

  await BrowserUtil.doAll(elt, async (f: ElementFinder) => {
    await scrollIntoView(f);
    await browser.wait(ExpectedConditions.elementToBeClickable(f));
    const web: WebElement = await f.getWebElement();
    await web.click();
  });
}

export async function scrollIntoView(el: WebElement | ElementFinder) {
  try {
    const web = el instanceof ElementFinder ? await el.getWebElement() : el;
    await browser.executeScript(`
      arguments[0].scrollIntoView({block: "center"});
      `, web);
  } catch (error) {
    // task isn't critical, don't fail step
    // tslint:disable no-empty
  }
}

