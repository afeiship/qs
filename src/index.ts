declare var wx: any;

// @thank to: https://github.com/jerrybendy/url-search-params-polyfill

const MSG = {
  NOT_SUPPORT: 'Please use url-search-params-polyfill',
};

class Qs {
  constructor() {
    const supportURLSearchParams = typeof URLSearchParams !== 'undefined';
    if (!supportURLSearchParams) console.warn(MSG.NOT_SUPPORT);
  }

  public stringify(inObj, inOptions?) {
    const params = new URLSearchParams();
    Object.keys(inObj).forEach((key) => {
      params.append(key, inObj[key]);
    });
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
