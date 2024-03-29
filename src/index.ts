declare var wx: any;

// @thank to: https://github.com/jerrybendy/url-search-params-polyfill

const MSG = {
  NOT_SUPPORT: 'Please use url-search-params-polyfill',
};

interface IStringifyTarget {
  [key: string]: any;
}

interface IStringifyOptions {
  /**
   * Array format
   * bracket: a[]=1&a[]=2
   * comma: a=1,2
   * index: a[0]=1&a[1]=2
   * none: a=1&a=2
   */
  arrayFormat?: 'bracket' | 'comma' | 'index' | 'none';
  /**
   * Ignore empty string, default false.
   */
  ignoreEmpty?: boolean;
  /**
   * Check value is empty, default check value === ''.
   */
  isEmpty?: (value: string) => boolean;
  /**
   * Custom get method, default return string.
   */
  get?: (value: URLSearchParams) => string;
}

interface IParseOptions {
  /**
   * If try parse value, use JSON.parse/split(',') to parse value.
   */
  tryParse?: boolean;
  /**
   * Custom get method, default return object.
   */
  get?: (value: URLSearchParams) => any;
}

const defaultStringifyOptions: IStringifyOptions = {
  arrayFormat: 'none',
  ignoreEmpty: false,
  isEmpty: (value) => value === '',
};
const defaultParseOptions: IParseOptions = { tryParse: false };

class Qs {
  constructor() {
    const supportURLSearchParams = typeof URLSearchParams !== 'undefined';
    if (!supportURLSearchParams) console.warn(MSG.NOT_SUPPORT);
  }

  /**
   * Stringify object to query string.
   * @param inObj
   * @param inOptions
   * @returns
   */
  public stringify(inObj: IStringifyTarget, inOptions?: IStringifyOptions) {
    const { arrayFormat, ignoreEmpty, isEmpty, get } = { ...defaultStringifyOptions, ...inOptions };
    const params = new URLSearchParams();

    for (const [key, value] of Object.entries(inObj)) {
      const isArrayValue = Array.isArray(value);
      const isObject = value && typeof value === 'object';
      if (isArrayValue) {
        switch (arrayFormat) {
          case 'bracket':
            value.forEach((item) => params.append(`${key}[]`, item));
            break;
          case 'comma':
            params.append(key, value.join(','));
            break;
          case 'index':
            value.forEach((item, index) => params.append(`${key}[${index}]`, item));
            break;
          case 'none':
            value.forEach((item) => params.append(key, item));
            break;
        }
      } else {
        const val = isObject ? encodeURIComponent(JSON.stringify(value)) : value;
        params.append(key, val);
      }
    }

    if (ignoreEmpty) {
      for (const [key, value] of params.entries()) {
        if (isEmpty!(value)) params.delete(key);
      }
    }

    if (get) return get(params);
    return decodeURIComponent(params.toString());
  }

  /**
   * Parse query string to object.
   * @param inString
   * @param inOptions
   * @returns
   */
  public parse(inString: string, inOptions?: IParseOptions) {
    const { tryParse, get } = { ...defaultParseOptions, ...inOptions };
    const isEncode = inString.indexOf('%') > -1;
    const str = isEncode ? decodeURIComponent(inString) : inString;
    const params = new URLSearchParams(str);
    if (get) return get(params);
    const obj = {};
    params.forEach((value, originalKey) => {
      // get a from `a[0] or a[] or a`
      const key = originalKey.replace(/\[\d*\]$/, '');
      const val = this.tryParseValue(value, tryParse);
      const hasValue = obj[key];
      if (hasValue) {
        if (Array.isArray(obj[key])) {
          obj[key].push(val);
        } else {
          obj[key] = [obj[key], val];
        }
      } else {
        obj[key] = val;
      }
    });
    return obj;
  }

  private tryParseValue(inValue: string, inTryParse?: boolean) {
    if (!inTryParse) return inValue;
    let result: string | string[] = inValue;
    try {
      result = JSON.parse(inValue);
    } catch (error) {
      const hasComma = inValue.indexOf(',') > -1;
      if (hasComma) result = inValue.split(',');
    }

    if (Array.isArray(result)) {
      result = result.map((item) => this.tryParseValue(item, inTryParse));
    }
    return result;
  }
}

const qs = new Qs();

// for commonjs es5 require
if (typeof module !== 'undefined' && module.exports && typeof wx === 'undefined') {
  module.exports = qs;
}

export default qs;
