/* Usages:
 @mapping
 "login button": ".login-button"

 @mapping()
 "login button": ".login-button"

 @mapping(/login button/i)
 loginButton: ".login-button"

 @mapping(/(.*) login button/i)
 loginButton(text: string): string {
 return `${text} .login-button`;
 }

 @given(/(.*) blah blah/i)
 blahBlah(text: string): Promise<void> {
 return mapping(text).then((eval) => {
 });
 }

 @give(/I want to map (.*) to (.*)/i)
 mapThis(key: string, value: string): void {
 mapping(key, value);
 }
*/
export type MappingValue = any | Promise<any> | ((...args: string[]) => any | Promise<any>);
export const mappings: { regex: RegExp, value: MappingValue, length: number, obj: any }[] = [];
function addMapping(obj: any, key: RegExp | string, value: MappingValue): void {
  let regex: RegExp;
  if (key instanceof RegExp) {
    regex = key;
  } else {
    const plural = key.charAt(key.length - 1) === 'y' ? key.substring(0, key.length - 1) + '(y|ies)?' : key + '(s|es)?';
    regex = new RegExp('^(the |a |an )?' + plural + '(s|es)?$', 'i');
  }
  console.log(`Mapping ${regex.source} => ${typeof value === 'function' ? value.name : value}`);
  mappings.push({ regex, obj, value, length: regex.toString().length });
}

function getMapping(target: string): any | Promise<any> {
  if (target.length >= 2 && target.charAt(0) === '\'' && target.charAt(target.length - 1) === '\'') {
    return target.substring(1, target.length - 1);
  }

  let bestValue: MappingValue = null;
  let bestLength = 0;

  const bestError: any[] = [];
  mappings.forEach((item: { regex: RegExp, value: MappingValue, length: number, obj: any }) => {
    const match = item.regex[Symbol.match](target);
    if (match && match.length) {
      const length = match[0].length + item.length / target.length;
      if (length >= bestLength) {
        try {
          bestValue = typeof item.value === 'function' ? item.value.apply(item.obj, match.slice(1)) : item.value;
          bestLength = length;
        } catch (e) {
          bestError.push(e);
        }
      }
    }
  });

  if (!bestValue) {
    throw new Error('No mapping found for ' + target + ': ' + bestError.join(', '));
  }
  return bestValue;
}

// Decorator usages
export function mapping(target: Object, key: string, descriptor?: PropertyDescriptor): void;
export function mapping(target?: RegExp): (target: any, key: string, descriptor?: PropertyDescriptor) => void;

// Key/value usages
export function mapping(target: RegExp | string, value: MappingValue): void;
export function mapping(target: any): Promise<any>;
export function mapping(target: any[]): Promise<any[]>;

export function mapping(target?: Object | RegExp | string | string[], value?: MappingValue, descriptor?: PropertyDescriptor): any {
  if (value === undefined) {
    if (target instanceof RegExp || target === undefined) {
      return (sub: any, key: string, subDescriptor?: PropertyDescriptor) => {
        addMapping(sub, <string | RegExp>(target || key), subDescriptor === undefined ? sub[key] : subDescriptor.value);
      };
    } else if (typeof target === 'string') {
      const returnValue = getMapping(target);
      return Promise.resolve(returnValue).then((val) => {
        if (val && val.elementArrayFinder_ && val.elementArrayFinder_.locator_) {
          console.log(target + ' mapped to ' + val.elementArrayFinder_.locator_);
        } else {
          console.log(target + ' mapped to ' + val);
        }
        return val;
      });
    } else {
      if (target instanceof Array) {
        const result: Promise<any>[] = [];
        (<any[]>target).forEach((text: any) => {
          result.push(mapping(text));
        });

        return Promise.all(result);
      } else {
        const indexes: any[] = [];
        const promises: Promise<any>[] = [];
        Object.keys(target).forEach((i) => {
          if (target[i]) {
            indexes.push(i);
            promises.push(mapping(target[i]));
          }
        });

        return Promise.all(promises).then((results) => {
          const obj = {};
          for (let i = 0; i < indexes.length; i++) {
            obj[indexes[i]] = results[i];
          }
          return obj;
        });
      }
    }
  } else {
    if (target instanceof RegExp || typeof target === 'string') {
      addMapping(null, target, value);
    } else if (target !== undefined && typeof value === 'string') {
      addMapping(descriptor === undefined ? null : target, value, descriptor === undefined ? target[value] : descriptor.value);
    }
    return target;
  }
}

