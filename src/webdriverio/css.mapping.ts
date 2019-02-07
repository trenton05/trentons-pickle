import { binding } from 'cucumber-tsflow';

import { mapping } from '../mapping';
import { BrowserUtil, ElementFinder } from './browser-util';

const cssContainingTextInsensitive = (cssSelector: string, searchText: string, using?: ElementFinder) => {
  const elements = using ? using.$$(cssSelector) : browser.$$(cssSelector);
  const matches: any[] = [];
  elements.forEach((e) => {
    const elementText = e.getText();
    if (elementText.replace(/\s+/g, ' ').toLowerCase().indexOf(searchText.replace(/\s+/g, ' ').toLowerCase()) > -1) {
      let parent = e.frameParent();
      while (parent && matches.length > 0 && matches[matches.length - 1] !== parent) {
        parent = parent.frameParent();
      }
      if (parent && matches.length > 0) {
        matches.pop();
      }
      matches.push(e);
    }
  });
  return matches;
};

const cssContainingInputWithValue = (cssSelector: string, searchText: string, using?: ElementFinder) => {
  const elements = using ? using.$$(cssSelector) : browser.$$(cssSelector);

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
  static elementIndex(index: string, elementMatch: string): Promise<any> {
    return mapping(elementMatch).then((elt: string) => {
      const array = browser.$$(elt);
      return array[parseInt(index, 10) - 1];
    });
  }

  @mapping(/^The ([0-9]+)(?:st|nd|rd|th) (.*?) in (.*)$/i)
  static elementInIndex(index: string, cssMatch: string, elementMatch: string): Promise<any> {
    return mapping([cssMatch, elementMatch]).then(([css, elt]: [string, any]) => {
      const finder = BrowserUtil.finder(elt);
      const array = finder.$$(css);
      return array[parseInt(index, 10) - 1];
    });
  }

  @mapping(/^The ([0-9]+)(?:st|nd|rd|th) (.*?) with text (.*)$/i)
  static elementWithTextIndex(index: string, elementMatch: string, textMatch: string): Promise<any> {
    return mapping([elementMatch, textMatch]).then(([elt, text]: [string, string]) => {
      const array = cssContainingTextInsensitive(elt, text);
      return array[parseInt(index, 10) - 1];
    });
  }

  @mapping(/^The (.*?) in (.*)$/i)
  static cssIndex(indexMatch: string, elementMatch: string): Promise<any> {
    return mapping([indexMatch, elementMatch]).then(([index, elt]: [string, any]) => {
      const finder: ElementFinder = BrowserUtil.finder(elt);
      return finder.$(index);
    });
  }

  @mapping(/^The (.*?) with text (.*?) in (.*)$/i)
  static cssTextIndex(indexMatch: string, textMatch: string, elementMatch: string): Promise<any> {
    return mapping([indexMatch, textMatch, elementMatch]).then(([index, text, elt]: [string, string, any]) => {
      const finder: ElementFinder = BrowserUtil.finder(elt);
      return cssContainingTextInsensitive(index, text, finder)[0];
    });
  }

  @mapping(/^The (.*?) with text (.*)$/i)
  static cssWithTextIndex(cssMatch: string, textMatch: string): Promise<any> {
    return mapping([textMatch, cssMatch]).then(([text, css]: [string, any, string]) => {
      return cssContainingTextInsensitive(css, text)[0];
    });
  }

  @mapping(/^The (.*?) with value (.*)$/i)
  static cssWithValueIndex(cssMatch: string, valueMatch: string): Promise<any> {
    return mapping([valueMatch, cssMatch]).then(([value, css]: [string, string]) => {
      return cssContainingInputWithValue(css, value)[0];
    });
  }

}
