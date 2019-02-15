import { binding, given, then, when } from 'cucumber-tsflow';
import { mapping } from '../mapping';
import { browser, ExpectedConditions } from 'protractor';
import * as Chance from 'chance';
import { BrowserUtil } from './browser-util';

const chance = new Chance();

@binding()
export default class GlobalSteps {

  @mapping(/^(?:a |an |the )?random (.*)$/i)
  static async randomMapping(type: string): Promise<string> {
    return chance[type]();
  }

  @when(/^I navigate to (.*)$/i)
  public async navigate(pageMatch: string): Promise<void> {
    const page: string = await mapping(pageMatch);
    await browser.get(page);
  }

  @then(/^(.*) is in the url/i)
  public async contains(pageMatch: string): Promise<void> {
    const page: string = await mapping(pageMatch);
    await browser.wait(ExpectedConditions.urlContains(page));
  }

  @then(/^(.*) is the url/i)
  public async loaded(pageMatch: string): Promise<void> {
    let page: string = await mapping(pageMatch);
    page = browser.baseUrl + page;
    await browser.wait(ExpectedConditions.urlIs(page));
  }

  @given(/^Random (.*) as (.*)$/i)
  public randomString(type: string, name: string): void {
    if (type === 'id') {
      return mapping(name, IdUtil.randomId());
    } else {
      return mapping(name, chance[type]());
    }
  }

  @given(/^The text in (.*) as (.*)$/i)
  public async assignText(type: string, name: string): Promise<void> {
    await BrowserUtil.safeWait(async () => {
      const elt: any = await mapping(type);
      const finder = BrowserUtil.finder(elt);
      const text: string = await finder.getText();
      mapping(name, text);
    });
  }

  @given(/^The value in (.*) as (.*)$/i)
  public async assignValue(type: string, name: string): Promise<void> {
    await BrowserUtil.safeWait(async () => {
      const elt: any = await mapping(type);
      const finder = BrowserUtil.finder(elt);
      const text: string = await finder.getAttribute('value');
      mapping(name, text);
    });
  }

  @when(/^I (?:reload|refresh) the page$/i)
  public async reloadPage(): Promise<void> {
    await browser.driver.navigate().refresh();
  }
}
