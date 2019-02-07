import {binding, then} from 'cucumber-tsflow';
import {mapping} from '../mapping';
import { ElementFinder, BrowserUtil } from './browser-util';

const textToBePresentInElementInsensitive = (elementFinder: ElementFinder, text: string) => {
  const hasText = () => {
    return elementFinder.getText().then((actualText) => {
      return actualText.replace(/\s+/g, ' ').toLowerCase().indexOf(text.replace(/\s+/g, ' ').toLowerCase()) > -1;
    });
  };
  return hasText;
};

const textToBePresentInElementValueInsensitive = (elementFinder: ElementFinder, text: string) => {
  const hasText = () => {
    return elementFinder.getValue().then((actualText) => {
      return actualText.replace(/\s+/g, ' ').toLowerCase().indexOf(text.replace(/\s+/g, ' ').toLowerCase()) > -1;
    });
  };
  return hasText;
};

@binding()
export default class InputSteps {

  @then(/^(.*) has value (.*)$/i)
  public async value(eltMatch: string, textMatch: string): Promise<void> {
    const [text, elt]: [string, any] = await mapping([textMatch, eltMatch]);
    const finder = BrowserUtil.finder(elt);
    await finder.scroll();
    await BrowserUtil.safeWait(textToBePresentInElementValueInsensitive(finder, text));
  }

  @then(/^(.*) has text (.*)$/i)
  public async text(eltMatch: string, textMatch: string): Promise<void> {
    const [text, elt]: [string, any] = await mapping([textMatch, eltMatch]);
    const finder = BrowserUtil.finder(elt);
    await finder.scroll();
    await BrowserUtil.safeWait(textToBePresentInElementInsensitive(finder, text));
  }

  @then(/^(.*) has exact text (.*)$/i)
  public async exactText(eltMatch: string, textMatch: string): Promise<void> {
    await BrowserUtil.safeWait(async () => {
      const [elt, text]: [any, string] = await mapping([eltMatch, textMatch]);
      const finder = BrowserUtil.finder(elt);
      await finder.scroll();
      const eltText = await finder.getText();
      if (text.trim() !== eltText.trim()) {
        throw new Error(`Text ${text} does not match element ${eltText}`);
      }
    });
  }

  @then(/^(.*) is visible$/i)
  public async visible(eltMatch: string): Promise<void> {
    const elt: any = await mapping(eltMatch);
    const finder = BrowserUtil.finder(elt);
    await BrowserUtil.safeWait(() => finder.isVisible());
  }

  @then(/^(.*) is enabled$/i)
  public async enabled(eltMatch: string): Promise<void> {
    await BrowserUtil.safeWait(async () => {
      const elt: any = await mapping(eltMatch);
      const finder = BrowserUtil.finder(elt);
      await finder.scroll();
      const isEnabled = await finder.isEnabled();
      if (!isEnabled) {
        throw new Error('Still disabled');
      }
    });
  }

  @then(/^(.*) is disabled$/i)
  public async disabled(eltMatch: string): Promise<void> {
    await BrowserUtil.safeWait(async () => {
      const elt: any = await mapping(eltMatch);
      const finder = BrowserUtil.finder(elt);
      await finder.scroll();
      const isEnabled = await finder.isEnabled();
      if (isEnabled) {
        throw new Error('Still enabled');
      }
    });
  }

  @then(/^(.*) is hidden$/i)
  public async hidden(eltMatch: string): Promise<void> {
    const elt: any = await mapping(eltMatch);
    const finder = BrowserUtil.finder(elt);
    await BrowserUtil.safeWait(() => !finder.isVisible());
  }

  @then(/^(.*) is present$/i)
  public async present(eltMatch: string): Promise<void> {
    await BrowserUtil.safeWait(async () => {
      const elt: any = await mapping(eltMatch);
      const finder = BrowserUtil.finder(elt);
      await finder.scroll();
      const present = await finder.isExisting();
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
      const present = await finder.isExisting();
      if (present) {
        throw new Error('Still present');
      }
    });
  }

  @then(/^(.*) appears above (.*)$/i)
  public async before(eltMatch1: string, eltMatch2: string): Promise<void> {
    await BrowserUtil.safeWait(async () => {
      const [elt1, elt2]: [any, any] = await mapping([eltMatch1, eltMatch2]);
      const finder1 = BrowserUtil.finder(elt1);
      await finder1.scroll();
      const loc1 = await finder1.getLocation('y');
      const finder2 = BrowserUtil.finder(elt2);
      const loc2 = await finder2.getLocation('y');
      if (loc1.valueOf() >= loc2.valueOf()) {
        throw new Error('Still below');
      }
    });
  }

}

