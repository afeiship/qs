import fn from '../src';

describe('qs.stringify', () => {
  test('normail case stringify', () => {
    const obj = { a: 1, b: 2 };
    const str = fn.stringify(obj);
    expect(str).toBe('a=1&b=2');
  });

  test('stringify-arrayFormat:bracket', () => {
    const obj = { a: [1, 2] };
    const str = fn.stringify(obj, { arrayFormat: 'bracket' });
    expect(str).toBe('a[]=1&a[]=2');
  });

  test('stringify-arrayFormat:index', () => {
    const obj = { a: [1, 2] };
    const str = fn.stringify(obj, { arrayFormat: 'index' });
    expect(str).toBe('a[0]=1&a[1]=2');
  });

  test('stringify-arrayFormat:comma', () => {
    const obj = { a: [1, 2] };
    const str = fn.stringify(obj, { arrayFormat: 'comma' });
    expect(str).toBe('a=1,2');
  });

  test('stringify-arrayFormat:none', () => {
    const obj = { a: [1, 2] };
    const str = fn.stringify(obj, { arrayFormat: 'none' });
    expect(str).toBe('a=1&a=2');
  });

  test('stringify-customize get', () => {
    const obj = { a: 1, b: 2 };
    const str = fn.stringify(obj, {
      get(params) {
        // console.log('params:', params);
        return 'abc';
      },
    });
    expect(str).toBe('abc');
  });

  test('stringify - ignoreEmptyString', () => {
    const obj = { a: '', b: 2 };
    const str1 = fn.stringify(obj, { ignoreEmptyString: true });
    const str2 = fn.stringify(obj, { ignoreEmptyString: false });
    expect(str1).toBe('b=2');
    expect(str2).toBe('a=&b=2');
  });
});
