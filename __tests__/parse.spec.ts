import fn from '../src';

describe('qs.parse', () => {
  test('normail case parse', () => {
    const s1 = 'a=1&b=2';
    const obj = fn.parse(s1);
    expect(obj).toEqual({ a: '1', b: '2' });
  });

  test('parse-tryParse number', () => {
    const s1 = 'a=1&b=2';
    const obj = fn.parse(s1, { tryParse: true });
    expect(obj).toEqual({ a: 1, b: 2 });
  });

  test('parse-tryParse json', () => {
    const s1 = 'a=1&b=2&c=%7B%22d%22%3A%22e%22%7D';
    const obj = fn.parse(s1, { tryParse: true });
    expect(obj).toEqual({ a: 1, b: 2, c: { d: 'e' } });
  });

  test('parse customize get', () => {
    const s1 = 'a=1&b=2';
    const obj = fn.parse(s1, { get: (params) => params.get('a') });
    expect(obj).toBe('1');
  });

  test('parse-arrayFormat:none', () => {
    const s1 = 'a=1&b=2&c=3&c=4';
    const obj = fn.parse(s1);
    expect(obj).toEqual({ a: '1', b: '2', c: ['3', '4'] });
  });

  test('parse-arrayFormat:bracket', () => {
    const s1 = 'a=1&b=2&c[]=3&c[]=4';
    const obj = fn.parse(s1);
    expect(obj).toEqual({ a: '1', b: '2', c: ['3', '4'] });
  });

  test('parse-arrayFormat:comma', () => {
    const s1 = 'a=1&b=2&c=3,4';
    const obj = fn.parse(s1);
    const obj2 = fn.parse(s1, { tryParse: true });
    expect(obj).toEqual({ a: '1', b: '2', c: '3,4' });
    expect(obj2).toEqual({ a: 1, b: 2, c: [3, 4] });
  });

  test('parse-arrayFormat:index', () => {
    const s1 = 'a=1&b=2&c[0]=3&c[1]=4';
    const obj = fn.parse(s1);
    const obj2 = fn.parse(s1, { tryParse: true });
    expect(obj).toEqual({ a: '1', b: '2', c: ['3', '4'] });
    expect(obj2).toEqual({ a: 1, b: 2, c: [3, 4] });
  });
});
