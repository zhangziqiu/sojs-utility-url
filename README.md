# sojs.utility.url
===================================
The fastest url parser in the world.

Benchmark:
node-url: 74,404 ops/sec ±3.07% (76 runs sampled)
sojs-utility-url: 534,134 ops/sec ±4.31% (76 runs sampled)
url-parse: 114,962 ops/sec ±4.59% (73 runs sampled)

---

# Install
```
npm install sojs-utility-url
```

# Use
```
require('sojs');
require('sojs-utility-url');

var url = sojs.using('sojs.utility.url');
url.parse('http://www.develop.cc/index.html');
```

# Develop

## install fro develop
```js
npm install
```

## Unit Test
```js
node .\tool\unit.js
```

## Benchmark
```js
node .\tool\benchmark.js
```

## Coverage
```js
node .\tool\coverage.js
```
