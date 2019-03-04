import { binding, given, then, when } from 'cucumber-tsflow';
import { mapping } from '../mapping';
import * as Chance from 'chance';
import { BrowserUtil, ElementFinder } from './browser-util';

const chance = new Chance();

@binding()
export default class GlobalSteps {

  @mapping(/^(?:a |an |the )?random ([^ ]*)(?: (?:with |and )([^ ]+) ([^ ]+))*$/i)
  static async randomMapping(type: string, ...props): Promise<string> {
    const options = {};
    for (let i = 0; i < props.length; i += 2) {
      const v = props[i + 1];
      options[props[i]] = !isNaN(Number(v)) ? Number(v) : v === 'true' ? true : v === 'false' ? false : v;
    }
    return chance[type](options);
  }

  @given(/^Random (.*) as (.*)$/i)
  public async randomString(type: string, name: string) {
    let val = await mapping(`random ${type}`);
    return mapping(name, val);
  }

  @given(/^The text in (.*) as (.*)$/i)
  public async assignText(type: string, name: string): Promise<void> {
    await BrowserUtil.safeWait(async () => {
      const elt: any = await mapping(type);
      const finder = await BrowserUtil.finder(elt);
      const text: string = await finder.getText();
      mapping(name, text);
    });
  }

  @given(/^The value in (.*) as (.*)$/i)
  public async assignValue(type: string, name: string): Promise<void> {
    await BrowserUtil.safeWait(async () => {
      const elt: any = await mapping(type);
      const finder = await BrowserUtil.finder(elt);
      const text: string = await finder.getValue();
      mapping(name, text);
    });
  }
}
