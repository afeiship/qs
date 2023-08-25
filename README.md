# qs
> A tiny querystring parser.

[![version][version-image]][version-url]
[![license][license-image]][license-url]
[![size][size-image]][size-url]
[![download][download-image]][download-url]

## installation
```shell
npm install @jswork/qs
```

## usage
```js
import qs from '@jswork/qs';

qs.parse('a=1&b=2'); // { a: '1', b: '2' }
qs.stringify({ a: 1, b: 2 }); // a=1&b=2
```

## license
Code released under [the MIT license](https://github.com/afeiship/qs/blob/master/LICENSE.txt).

[version-image]: https://img.shields.io/npm/v/@jswork/qs
[version-url]: https://npmjs.org/package/@jswork/qs

[license-image]: https://img.shields.io/npm/l/@jswork/qs
[license-url]: https://github.com/afeiship/qs/blob/master/LICENSE.txt

[size-image]: https://img.shields.io/bundlephobia/minzip/@jswork/qs
[size-url]: https://github.com/afeiship/qs/blob/master/dist/index.js

[download-image]: https://img.shields.io/npm/dm/@jswork/qs
[download-url]: https://www.npmjs.com/package/@jswork/qs
