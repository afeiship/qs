import fn from '../src';

describe('api.basic', () => {
  test('normail case parse/stringify', () => {
    const obj = { a: 1, b: 2 };
    const str = fn.stringify(obj);
    const obj2 = fn.parse(str);

    expect(str).toBe('a=1&b=2');
    expect(obj2).toEqual({ a: '1', b: '2' });
  });
});
