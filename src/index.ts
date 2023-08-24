declare var wx: any;

// @thank to: https://github.com/jerrybendy/url-search-params-polyfill

const MSG = {
  NOT_SUPPORT: 'Please use url-search-params-polyfill',
};

interface IStringifyOptions {
  /**
   * 数组格式
   */
  arrayFormat?: 'bracket' | 'comma' | 'index' | 'none';
  /**
   * 是否编码
   */
  encode?: boolean;
  /**
   * 是否只编码值
   */
  encodeValuesOnly?: boolean;
  /**
   * 是否排除空值
   */
  ignoreEmptyString?: boolean;
}

const defaultStringifyOptions: IStringifyOptions = {
  arrayFormat: 'none',
  encode: true,
  encodeValuesOnly: false,
  ignoreEmptyString: false,
};

class Qs {
  constructor() {
    const supportURLSearchParams = typeof URLSearchParams !== 'undefined';
    if (!supportURLSearchParams) console.warn(MSG.NOT_SUPPORT);
  }

  public stringify(inObj, inOptions?: IStringifyOptions) {
    const opts: IStringifyOptions = { ...defaultStringifyOptions, ...inOptions };
    const { arrayFormat, encode, encodeValuesOnly, ignoreEmptyString } = opts;
    const params = new URLSearchParams();
    const keys = Object.keys(inObj);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const value = inObj[key];
    }
    return params.toString();
  }

  public parse(inString, inOptions?) {
    const params = new URLSearchParams(inString);
    const obj = {};
    params.forEach((value, key) => {
      obj[key] = value;
    });
    return obj;
  }
}

const qs = new Qs();

// for commonjs es5 require
if (typeof module !== 'undefined' && module.exports && typeof wx === 'undefined') {
  module.exports = qs;
}

export default qs;
