import { binding } from 'cucumber-tsflow';

import { mapping } from '../mapping';
import { BrowserUtil, ElementFinder } from './browser-util';

const cssContainingTextInsensitive = async (cssSelector: string, searchText: string, using?: ElementFinder) => {
  const elements = using ? await using.$$(cssSelector) : await browser.$$(cssSelector);
  const matches: any[] = [];
  await Promise.all(elements.map(async (e: any) => {
    const elementText = (await e.getText()) + ' ' + ((await e.getAttribute('text')) || '');
    if (elementText.replace(/\s+/g, ' ').toLowerCase().indexOf(searchText.replace(/\s+/g, ' ').toLowerCase()) > -1) {
      let parent = await e.frameParent() as any;
      while (parent && matches.length > 0 && matches[matches.length - 1] !== parent) {
        parent = await parent.frameParent();
      }
      if (parent && matches.length > 0) {
        matches.pop();
      }
      matches.push(e);
    }
  }));
  return matches;
};

const cssContainingInputWithValue = async (cssSelector: string, searchText: string, using?: ElementFinder) => {
  const elements = using ? await using.$$(cssSelector) : await browser.$$(cssSelector);

  const matches: any[] = [];
  elements.forEach((e) => {
    const elementValue = e.getValue();
    if (elementValue.indexOf(searchText) > -1) {
      matches.push(e);
    }
  });
  return matches;
};

mapping('text', 'Text');

@binding()
export default class CssSteps {

  @mapping(/^The ([0-9]+)(?:st|nd|rd|th) (.*)$/i)
  static async elementIndex(index: string, elementMatch: string): Promise<any> {
    const elt = await mapping(elementMatch);
    const array = await browser.$$(elt);
    return array[parseInt(index, 10) - 1];
  }

  @mapping(/^The ([0-9]+)(?:st|nd|rd|th) (.*?) in (.*)$/i)
  static async elementInIndex(index: string, cssMatch: string, elementMatch: string): Promise<any> {
    const css = await mapping(cssMatch);
    const elt = await mapping(elementMatch);
    const finder = await BrowserUtil.finder(elt);
    const array = await finder.$$(css);
    return array[parseInt(index, 10) - 1];
  }

  @mapping(/^The ([0-9]+)(?:st|nd|rd|th) (.*?) with text (.*)$/i)
  static async elementWithTextIndex(index: string, elementMatch: string, textMatch: string): Promise<any> {
    const elt = await mapping(elementMatch);
    const text = await mapping(textMatch);
    const array = await cssContainingTextInsensitive(elt, text);
    return array[parseInt(index, 10) - 1];
  }

  @mapping(/^The (.*?) in (.*)$/i)
  static async cssIndex(indexMatch: string, elementMatch: string): Promise<any> {
    const elt = await mapping(elementMatch);
    const index = await mapping(indexMatch);
    const finder: ElementFinder = await BrowserUtil.finder(elt);
    return await finder.$(index);
  }

  @mapping(/^The (.*?) with text (.*?) in (.*)$/i)
  static async cssTextIndex(indexMatch: string, textMatch: string, elementMatch: string): Promise<any> {
    const elt = await mapping(elementMatch);
    const text = await mapping(textMatch);
    const index = await mapping(indexMatch);
    const finder: ElementFinder = await BrowserUtil.finder(elt);
    return (await cssContainingTextInsensitive(index, text, finder))[0];
  }

  @mapping(/^The (.*?) with text (.*)$/i)
  static async cssWithTextIndex(cssMatch: string, textMatch: string): Promise<any> {
    const css = await mapping(cssMatch);
    const text = await mapping(textMatch);
    return (await cssContainingTextInsensitive(css, text))[0];
  }

  @mapping(/^The (.*?) with value (.*)$/i)
  static async cssWithValueIndex(cssMatch: string, valueMatch: string): Promise<any> {
    const css = await mapping(cssMatch);
    const value = await mapping(valueMatch);
    return (await cssContainingInputWithValue(css, value))[0];
  }

}
