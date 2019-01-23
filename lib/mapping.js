import { Log } from './log';
const mappings = [];
function addMapping(obj, key, value) {
    let regex;
    if (key instanceof RegExp) {
        regex = key;
    }
    else {
        const plural = key.charAt(key.length - 1) === 'y' ? key.substring(0, key.length - 1) + '(y|ies)?' : key + '(s|es)?';
        regex = new RegExp('^(the |a |an )?' + plural + '(s|es)?$', 'i');
    }
    mappings.push({ regex, obj, value, length: regex.toString().length });
}
function getMapping(target) {
    if (target.length >= 2 && target.charAt(0) === '\'' && target.charAt(target.length - 1) === '\'') {
        return target.substring(1, target.length - 1);
    }
    let bestValue = null;
    let bestLength = 0;
    const bestError = [];
    mappings.forEach((item) => {
        const match = item.regex[Symbol.match](target);
        if (match && match.length) {
            const length = match[0].length + item.length / target.length;
            if (length >= bestLength) {
                try {
                    bestValue = typeof item.value === 'function' ? item.value.apply(item.obj, match.slice(1)) : item.value;
                    bestLength = length;
                }
                catch (e) {
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
export function mapping(target, value, descriptor) {
    if (value === undefined) {
        if (target instanceof RegExp || target === undefined) {
            return (sub, key, subDescriptor) => {
                addMapping(sub, (target || key), subDescriptor === undefined ? sub[key] : subDescriptor.value);
            };
        }
        else if (typeof target === 'string') {
            const returnValue = getMapping(target);
            return Promise.resolve(returnValue).then((val) => {
                if (val && val.elementArrayFinder_ && val.elementArrayFinder_.locator_) {
                    Log.debug(target + ' mapped to ' + val.elementArrayFinder_.locator_);
                }
                else {
                    Log.debug(target + ' mapped to ' + val);
                }
                return val;
            });
        }
        else {
            if (target instanceof Array) {
                const result = [];
                target.forEach((text) => {
                    result.push(mapping(text));
                });
                return Promise.all(result);
            }
            else {
                const indexes = [];
                const promises = [];
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
    }
    else {
        if (target instanceof RegExp || typeof target === 'string') {
            addMapping(null, target, value);
        }
        else if (target !== undefined && typeof value === 'string') {
            addMapping(descriptor === undefined ? null : target, value, descriptor === undefined ? target[value] : descriptor.value);
        }
        return target;
    }
}
//# sourceMappingURL=mapping.js.map