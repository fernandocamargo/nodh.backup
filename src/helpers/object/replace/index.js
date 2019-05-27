import isFunction from 'lodash/isFunction';
import isString from 'lodash/isString';

const deflate = object => (Array.isArray(object) ? [] : {});

const replace = (object, path = []) => ({
  with: replacement => {
    const entries = !!object ? Object.entries(object) : [];
    const skip =
      !isFunction(replacement) || isString(object) || !entries.length;
    const dig = (current, [key, value]) => {
      const deep = !!Object.keys(value).length;
      const location = path.concat(key);
      const assign = value => Object.assign(current, { [key]: value });
      const concat = value => current.concat(value);
      const next = deep
        ? replace(value, location).with(replacement)
        : replacement(location, value);

      return Array.isArray(current) ? concat(next) : assign(next);
    };

    return skip ? object : entries.reduce(dig, deflate(object));
  },
});

export default replace;
