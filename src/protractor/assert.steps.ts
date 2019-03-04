import {binding, then} from 'cucumber-tsflow';
import { $, browser, ExpectedConditions, ElementFinder, ElementArrayFinder, $$, by } from 'protractor';
import {mapping} from '../mapping';
import {BrowserUtil} from './browser-util';
import {scrollIntoView} from './input.steps';
import {falseIfMissing} from 'protractor/built/util';

const textToBePresentInElementInsensitive = (elementFinder: ElementFinder, text: string): Function => {
  const hasText = () => {
    return elementFinder.getText().then((actualText) => {
      return actualText.replace(/\s+/g, ' ').toLowerCase().indexOf(text.replace(/\s+/g, ' ').toLowerCase()) > -1;
    }, falseIfMissing);
  };
  return ExpectedConditions.and(ExpectedConditions.presenceOf(elementFinder), hasText);
};

const textToBePresentInElementValueInsensitive = (elementFinder: ElementFinder, text: string): Function => {
  const hasText = () => {
    return elementFinder.getAttribute('value').then((actualText) => {
      return actualText.replace(/\s+/g, ' ').toLowerCase().indexOf(text.replace(/\s+/g, ' ').toLowerCase()) > -1;
    }, falseIfMissing);
  };
  return ExpectedConditions.and(ExpectedConditions.presenceOf(elementFinder), hasText);
};

@binding()
export default class InputSteps {

  @then(/^(.*) has value (.*)$/i)
  public async value(eltMatch: string, textMatch: string): Promise<void> {
    const [text, elt]: [string, any] = await mapping([textMatch, eltMatch]);
    const finder = BrowserUtil.finder(elt);
    await scrollIntoView(finder);
    await browser.wait(textToBePresentInElementValueInsensitive(finder, text));
  }

  @then(/^(.*) has text (.*)$/i)
  public async text(eltMatch: string, textMatch: string): Promise<void> {
    const [text, elt]: [string, any] = await mapping([textMatch, eltMatch]);
    const finder = BrowserUtil.finder(elt);
    await scrollIntoView(finder);
    await browser.wait(textToBePresentInElementInsensitive(finder, text));
  }

  @then(/^(.*) has exact text (.*)$/i)
  public async exactText(eltMatch: string, textMatch: string): Promise<void> {
    await BrowserUtil.safeWait(async () => {
      const [elt, text]: [any, string] = await mapping([eltMatch, textMatch]);
      const finder = BrowserUtil.finder(elt);
      await scrollIntoView(finder);
      const eltText = await finder.getText();
      if (text.trim() !== eltText.trim()) {
        throw new Error(`Text ${text} does not match element ${eltText}`);
      }
    });
  }

  @then(/^(.*) has selected text (.*)$/i)
  public async selectedOption(eltMatch: string, textMatch: string): Promise<void> {
    const [text, elt]: [string, any] = await mapping([textMatch, eltMatch]);
    const selected = BrowserUtil.finder(elt).element(by.css('option:checked'));
    await scrollIntoView(selected);
    await browser.wait(textToBePresentInElementInsensitive(selected, text));
  }

  @then(/^(.*) is visible$/i)
  public async visible(eltMatch: string): Promise<void> {
    const elt: any = await mapping(eltMatch);
    const finder = BrowserUtil.finder(elt);
    await browser.wait(ExpectedConditions.visibilityOf(finder));
  }

  @then(/^(.*) is enabled$/i)
  public async enabled(eltMatch: string): Promise<void> {
    await BrowserUtil.safeWait(async () => {
      const elt: any = await mapping(eltMatch);
      const finder = BrowserUtil.finder(elt);
      await scrollIntoView(finder);
      const isDisabled = await finder.getAttribute('disabled');
      if (isDisabled) {
        throw new Error('Still disabled');
      }
    });
  }

  @then(/^(.*) is disabled$/i)
  public async disabled(eltMatch: string): Promise<void> {
    await BrowserUtil.safeWait(async () => {
      const elt: any = await mapping(eltMatch);
      const finder = BrowserUtil.finder(elt);
      await scrollIntoView(finder);
      const isDisabled = await finder.getAttribute('disabled');
      if (!isDisabled) {
        throw new Error('Still enabled');
      }
    });
  }

  @then(/^(.*) is (?:not visible|hidden)$/i)
  public async hidden(eltMatch: string): Promise<void> {
    const elt: any = await mapping(eltMatch);
    const finder = BrowserUtil.finder(elt);
    await browser.wait(ExpectedConditions.invisibilityOf(finder));
  }

  @then(/^(.*) is present$/i)
  public async present(eltMatch: string): Promise<void> {
    await BrowserUtil.safeWait(async () => {
      const elt: any = await mapping(eltMatch);
      const finder = BrowserUtil.finder(elt);
      await scrollIntoView(finder);
      const present = await finder.isPresent();
      if (!present) {
        throw new Error('Still not present');
      }
    });
  }

  @then(/^(.*) is not present$/i)
  public async notPresent(eltMatch: string): Promise<void> {
    await BrowserUtil.safeWait(async () => {
      const elt: any = await mapping(eltMatch);
      const finder = BrowserUtil.finder(elt);
      const present = await finder.isPresent();
      if (present) {
        throw new Error('Still present');
      }
    });
  }

  @then(/^(.*) is (not )?clickable$/i)
  public async isClickable(eltMatch: string, negationText: string): Promise<void> {
    const elt: any = await mapping(eltMatch);
    const finder = BrowserUtil.finder(elt);
    if (!negationText) {
      await browser.wait(ExpectedConditions.elementToBeClickable(finder));
    } else {
      await browser.wait(ExpectedConditions.not(ExpectedConditions.elementToBeClickable(finder)));
    }
  }

  @then(/^(all )?(?:of )?(.*) (?:is|are) (not |un)?checked$/i)
  public async checkStep(all: boolean, eltMatch: string, negationText: string) {
    all ? await this.allChecked(eltMatch, !negationText) : await this.checked(eltMatch, !negationText);
  }

  public async checked(eltMatch: string, checked: boolean): Promise<void> {
    await BrowserUtil.safeWait(async () => {
      const elt: any = await mapping(eltMatch);
      const finder = BrowserUtil.finder(elt);
      await scrollIntoView(finder);
      const checkedAttr = await finder.getAttribute('checked');
      if (checked) {
        if (!checkedAttr) {
          throw new Error(`Expected all elements to be checked: '${eltMatch}'`);
        }
      } else {
        if (checkedAttr) {
          throw new Error(`Expected all elements to be unchecked: '${eltMatch}'`);
        }
      }
    });
  }

  public async allChecked(eltMatch: string, checked: boolean): Promise<void> {
    const elt: any = await mapping(eltMatch);

    await BrowserUtil.doAll(elt, async (f: ElementFinder) => {
      await scrollIntoView(f);
      const checkedAttr = await f.getAttribute('checked');
      if (checked) {
        if (!checkedAttr) {
          throw new Error(`Expected all elements to be checked: '${eltMatch}'`);
        }
      } else {
        if (checkedAttr) {
          throw new Error(`Expected all elements to be unchecked: '${eltMatch}'`);
        }
      }
    });
  }

  @then(/^(.*) appears above (.*)$/i)
  public async before(eltMatch1: string, eltMatch2: string): Promise<void> {
    await BrowserUtil.safeWait(async () => {
      const [elt1, elt2]: [any, any] = await mapping([eltMatch1, eltMatch2]);
      const finder1 = BrowserUtil.finder(elt1);
      await scrollIntoView(finder1);
      const loc1 = await finder1.getLocation();
      const finder2 = BrowserUtil.finder(elt2);
      const loc2 = await finder2.getLocation();
      if (loc1.y >= loc2.y) {
        throw new Error('Still below');
      }
    });
  }

}

