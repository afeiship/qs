declare var wx: any;

// @thank to: https://github.com/jerrybendy/url-search-params-polyfill

const MSG = {
  NOT_SUPPORT: 'Please use url-search-params-polyfill',
};

interface IStringifyOptions {
  /**
   * 是否添加查询前缀
   */
  addQueryPrefix?: boolean;
  /**
   * 数组格式
   */
  arrayFormat?: 'bracket' | 'index' | 'none';
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
  addQueryPrefix: false,
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
    const params = new URLSearchParams();

    // const params = new URLSearchParams();
    // Object.keys(inObj).forEach((key) => {
    //   params.append(key, inObj[key]);
    // });
    // return params.toString();
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
