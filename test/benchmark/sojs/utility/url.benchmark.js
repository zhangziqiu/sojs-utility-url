/**
 * milestone1-no-extension:
 * node-url.parse(url, true, false) x 116,351 ops/sec ±4.90% (84 runs sampled)
 * sojs-utility-url.parse(url, true, false) x 572,041 ops/sec ±4.08% (89 runs sampled)
 *
 * milestone2-with-extension:
 * node-url.parse(url, true, false) x 117,038 ops/sec ±4.05% (81 runs sampled)
 * sojs-utility-url.parse(url, true, false) x 507,578 ops/sec ±2.84% (88 runs sampled)
 *
 */
sojs.define({
    name: 'urlBenchmark',
    $urlBenchmark: function () {
        var benchmarkClass = sojs.using('sojs.test.benchmark').benchmarkClass;
        var suite = new benchmarkClass.Suite();
        var nodeUrlClass = require('url');
        var urlClass = sojs.using('sojs.utility.url');
        var urlParse = require('url-parse');
        var testUrl = 'http://www.aaa.com:8080/b/c/d.html?e=1&f=2#ggg';

        suite.add('node-url.parse(url, true, false)', {
            fn: function () {
                var result = nodeUrlClass.parse(testUrl);
            }
        }).add('sojs-utility-url.parse(url, true, false)', {
            fn: function () {
                var result = urlClass.parse(testUrl);
            }
        }).add('url-parse', {
            fn: function () {
                var result = urlParse(testUrl, true);
            }
        }).on('cycle', function (event) {
            console.log(String(event.target));
        }).run({
            'async': true,
            'initCount': 2
        });

    }
});


