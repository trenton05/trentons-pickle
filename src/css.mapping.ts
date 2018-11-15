import { binding } from 'cucumber-tsflow';

import { mapping } from '../mapping';
import { $, $$, by, element, ElementFinder } from 'protractor';
import { BrowserUtil } from '../browser-util';
declare const document: any;

const cssContainingTextInsensitive = (cssSelector: string, searchText: string, using?) => {
  using = using || document;

  const elements = using.querySelectorAll(cssSelector);
  const matches: any[] = [];
  elements.forEach((e) => {
    const elementText = e.textContent || e.innerText || '';
    if (elementText.replace(/\s+/g, ' ').toLowerCase().indexOf(searchText.replace(/\s+/g, ' ').toLowerCase()) > -1) {
      matches.push(e);
    }
  });
  return matches;
};
by.addLocator('cssContainingTextInsensitive', cssContainingTextInsensitive);

const cssContainingInputWithValue = (cssSelector: string, searchText: string, using?) => {
    using = using || document;

    const elements = using.querySelectorAll(cssSelector);
    const matches: any[] = [];
    elements.forEach((e) => {
        const inputs = e.querySelectorAll('input');
        inputs.forEach((i) => {
            const elementValue = i.value || '';
            if (elementValue.indexOf(searchText) > -1) {
                matches.push(e);
            }
        });
    });
    return matches;
};
by.addLocator('cssContainingInputWithValue', cssContainingInputWithValue);

@binding()
export default class CssSteps {

  @mapping(/^The ([0-9]+)(?:st|nd|rd|th) (.*)$/i)
  static elementIndex(index: string, elementMatch: string): Promise<any> {
    return mapping(elementMatch).then((elt: string) => {
      const array = $$(elt);
      return array.get(parseInt(index, 10) - 1);
    });
  }

  @mapping(/^The ([0-9]+)(?:st|nd|rd|th) (.*?) in (.*)$/i)
  static elementInIndex(index: string, cssMatch: string, elementMatch: string): Promise<any> {
    return mapping([cssMatch, elementMatch]).then(([css, elt]: [string, any]) => {
      const finder = BrowserUtil.finder(elt);
      const array = finder.all(by.css(css));
      return array.get(parseInt(index, 10) - 1);
    });
  }

  @mapping(/^The ([0-9]+)(?:st|nd|rd|th) (.*?) with text (.*)$/i)
  static elementWithTextIndex(index: string, elementMatch: string, textMatch: string): Promise<any> {
    return mapping([elementMatch, textMatch]).then(([elt, text]: [string, string]) => {
      const array = element.all(by['cssContainingTextInsensitive'](elt, text));
      return array.get(parseInt(index, 10) - 1);
    });
  }

  @mapping(/^The (.*?) in (.*)$/i)
  static cssIndex(indexMatch: string, elementMatch: string): Promise<any> {
    return mapping([indexMatch, elementMatch]).then(([index, elt]: [string, any]) => {
      const finder: ElementFinder = BrowserUtil.finder(elt);
      return finder.element(by.css(index));
    });
  }

  @mapping(/^The (.*?) with text (.*?) in (.*)$/i)
  static cssTextIndex(indexMatch: string, textMatch: string, elementMatch: string): Promise<any> {
    return mapping([indexMatch, textMatch, elementMatch]).then(([index, text, elt]: [string, string, any]) => {
      const finder: ElementFinder = elt instanceof ElementFinder ? elt : $(elt);
      return finder.element(by['cssContainingTextInsensitive'](index, text));
    });
  }

  @mapping(/^The (.*?) with text (.*)$/i)
  static cssWithTextIndex(cssMatch: string, textMatch: string): Promise<any> {
    return mapping([textMatch, cssMatch]).then(([text, css]: [string, any, string]) => {
      return element(by['cssContainingTextInsensitive'](css, text));
    });
  }

  @mapping(/^The (.*?) with value (.*)$/i)
  static cssWithValueIndex(cssMatch: string, valueMatch: string): Promise<any> {
      return mapping([valueMatch, cssMatch]).then(([value, css]: [string, string]) => {
          return element(by['cssContainingInputWithValue'](css, value));
      });
  }

}
