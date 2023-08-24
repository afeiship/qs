import fn from '../src';

describe('api.basic', () => {
  test('normail case parse/stringify', () => {
    const obj = { a: 1, b: 2 };
    const str = fn.stringify(obj);
    const obj2 = fn.parse(str);

    expect(str).toBe('a=1&b=2');
    expect(obj2).toEqual({ a: '1', b: '2' });
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
});
