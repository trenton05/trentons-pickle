import { binding, when } from 'cucumber-tsflow';

import { mapping } from '../mapping';
import { BrowserUtil, ElementFinder } from './browser-util';
import * as path from 'path';
import { Key } from 'protractor';

@binding()
export default class InputSteps {

  @when(/^I click (all )?(?:of )?(.*)$/i)
  public async clickStep(all: boolean, eltMatch: string): Promise<void> {
    all ? await clickAll(eltMatch) : await click(eltMatch);
  }

  @when(/^I (clear and )?(click into and )?enter (.*) into (.*)$/i)
  public async enterTextStep(clearText: string, clickText: string, textMatch: string, eltMatch: string): Promise<void> {
    const [text]: [string] = await mapping([textMatch]);
    await enterText(eltMatch, text, clearText != null && clearText.length > 0, clickText != null && clickText.length > 0);
  }
}

export async function enterText(field: string, text: string, shouldClear: boolean, shouldClick: boolean): Promise<any> {
  const [elt]: [string] = await mapping([field]);
  const finder = BrowserUtil.finder(elt);
  await finder.scroll();
  await finder.waitForVisible();
  if (shouldClear) {

    const textValue = await finder.getValue();
    for (let i = 0; i < textValue.length; i++) {
      finder.keys(Key.BACK_SPACE);
    }
  }

  if (shouldClick) {
    await finder.click();
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
    finder.keys(list);
  } else {
    finder.keys(text);
  }
}

export async function click(field: string): Promise<any> {
  const elt: any = await mapping(field);
  const finder = BrowserUtil.finder(elt);
  await finder.scroll();
  await finder.waitForVisible();
  await finder.click();
}

export async function clickAll(field: string): Promise<any> {
  const elt: any = await mapping(field);

  await BrowserUtil.doAll(elt, async (f: ElementFinder) => {
    await f.scroll();
    await f.waitForVisible();
    await f.click();
  });
}
