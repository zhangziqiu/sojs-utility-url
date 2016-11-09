/**
 * 单元测试类
 * @author zhangziqiu<zhangziqiu@qq.com>
 */
    
var assert = require('assert');
var urlClass = sojs.using('sojs.utility.url');

describe('===== sojs.utility.url =====', function () {

    it('protocolTestCase', function () {
        var protocolTestCase = [{
            origin: 'http://www.a.com',
            protocol: 'http',
            host: 'www.a.com',
            domain: 'a.com',
            port: 80,
            path: [],
            query: {}
        }, {
            origin: 'file:///D/code/other/adm/adm/adm.html?id=abc&w=200&h=150',
            protocol: 'file',
            host: '',
            domain: '',
            extension: 'html',
            path: [ 'D', 'code', 'other', 'adm', 'adm', 'adm' ],
            query: { id: 'abc', w: '200', h: '150' }
        }];

        for (var i = 0, count = protocolTestCase.length; i < count; i++) {
            var expect = protocolTestCase[i];
            var actual = urlClass.parse(expect.origin);
            assert.deepEqual(actual, expect);
        }
    });

    it('hostTestCase', function () {
        var hostTestCase = [{
            origin: 'http://www.a.com',
            protocol: 'http',
            host: 'www.a.com',
            domain: 'a.com',
            port: 80,
            path: [],
            query: {}
        }, {
            origin: 'http://www.a.com:8888',
            protocol: 'http',
            host: 'www.a.com',
            domain: 'a.com',
            port: 8888,
            path: [],
            query: {}
        }, {
            origin: 'http://www.a.com/',
            protocol: 'http',
            host: 'www.a.com',
            domain: 'a.com',
            port: 80,
            path: [],
            query: {}
        }, {
            origin: 'http://www.a.com/b/c',
            protocol: 'http',
            host: 'www.a.com',
            domain: 'a.com',
            port: 80,
            path: ['b', 'c'],
            query: {}
        }, {
            origin: 'http://www.a.com/#bbb',
            protocol: 'http',
            host: 'www.a.com',
            domain: 'a.com',
            port: 80,
            path: [],
            query: {},
            anchor: 'bbb'
        }, {
            origin: 'http://www.a.com/?b=1&c=2',
            protocol: 'http',
            host: 'www.a.com',
            domain: 'a.com',
            port: 80,
            path: [],
            query: {b: '1', c: '2'}
        }];

        for (var i = 0, count = hostTestCase.length; i < count; i++) {
            var expect = hostTestCase[i];
            var actual = urlClass.parse(expect.origin);
            assert.deepEqual(actual, expect);
        }
    });

    it('portTestCase', function () {
        var portTestCase = [{
            origin: 'http://www.a.com',
            protocol: 'http',
            host: 'www.a.com',
            domain: 'a.com',
            port: 80,
            path: [],
            query: {}
        }, {
            origin: 'http://www.a.com:8888',
            protocol: 'http',
            host: 'www.a.com',
            domain: 'a.com',
            port: 8888,
            path: [],
            query: {}
        }, {
            origin: 'http://www.a.com:8888/',
            protocol: 'http',
            host: 'www.a.com',
            domain: 'a.com',
            port: 8888,
            path: [],
            query: {}
        }, {
            origin: 'http://www.a.com:8888/b/c',
            protocol: 'http',
            host: 'www.a.com',
            domain: 'a.com',
            port: 8888,
            path: ['b', 'c'],
            query: {}
        }, {
            origin: 'http://www.a.com:8888/?b=1',
            protocol: 'http',
            host: 'www.a.com',
            domain: 'a.com',
            port: 8888,
            path: [],
            query: {b: '1'}
        }, {
            origin: 'http://www.a.com:8888/#bbb',
            protocol: 'http',
            host: 'www.a.com',
            domain: 'a.com',
            port: 8888,
            path: [],
            query: {},
            anchor: 'bbb'
        }, {
            origin: 'http://127.0.0.1/common/css/font-awesome/fontawesome-webfont.woff2?v=4.5.0',
            protocol: 'http',
            host: '127.0.0.1',
            domain: '0.1',
            port: 80,
            path: ['common', 'css', 'font-awesome', 'fontawesome-webfont'],
            extension: 'woff2' ,
            query: {v:'4.5.0'}
        }];

        for (var i = 0, count = portTestCase.length; i < count; i++) {
            var expect = portTestCase[i];
            var actual = urlClass.parse(expect.origin);
            assert.deepEqual(actual, expect);
        }
    });

    it('pathTestCase', function () {
        var pathTestCase = [{
            origin: 'http://www.a.com/b',
            protocol: 'http',
            host: 'www.a.com',
            domain: 'a.com',
            port: 80,
            path: ['b'],
            query: {}
        }, {
            origin: 'http://www.a.com/b/',
            protocol: 'http',
            host: 'www.a.com',
            domain: 'a.com',
            port: 80,
            path: ['b'],
            query: {}
        }, {
            origin: 'http://www.a.com/b/c',
            protocol: 'http',
            host: 'www.a.com',
            domain: 'a.com',
            port: 80,
            path: ['b', 'c'],
            query: {}
        }, {
            origin: 'http://www.a.com/b/c/',
            protocol: 'http',
            host: 'www.a.com',
            domain: 'a.com',
            port: 80,
            path: ['b', 'c'],
            query: {}
        }, {
            origin: 'http://www.a.com/b/c.html',
            protocol: 'http',
            host: 'www.a.com',
            domain: 'a.com',
            port: 80,
            path: ['b', 'c'],
            extension: 'html',
            query: {}
        }, {
            origin: 'http://www.a.com/b/?c=1&d=2',
            protocol: 'http',
            host: 'www.a.com',
            domain: 'a.com',
            port: 80,
            path: ['b'],
            query: {c: '1', d: '2'}
        }, {
            origin: 'http://www.a.com/b/c?d=1&e=2',
            protocol: 'http',
            host: 'www.a.com',
            domain: 'a.com',
            port: 80,
            path: ['b', 'c'],
            query: {d: '1', e: '2'}
        }, {
            origin: 'http://www.a.com/b/c#ddd',
            protocol: 'http',
            host: 'www.a.com',
            domain: 'a.com',
            port: 80,
            path: ['b', 'c'],
            query: {},
            anchor: 'ddd'
        }, {
            origin: 'http://www.a.com/b#ccc',
            protocol: 'http',
            host: 'www.a.com',
            domain: 'a.com',
            port: 80,
            path: ['b'],
            query: {},
            anchor: 'ccc'
        }];

        for (var i = 0, count = pathTestCase.length; i < count; i++) {
            var expect = pathTestCase[i];
            var actual = urlClass.parse(expect.origin);
            assert.deepEqual(actual, expect);
        }
    });

    it('extensionTestCase', function () {
        var extensionTestCase = [{
            origin: 'http://www.a.com/b/c/d',
            protocol: 'http',
            host: 'www.a.com',
            domain: 'a.com',
            port: 80,
            path: ['b', 'c', 'd'],
            query: {}
        }, {
            origin: 'http://www.a.com/b/c/d?e=1',
            protocol: 'http',
            host: 'www.a.com',
            domain: 'a.com',
            port: 80,
            path: ['b', 'c', 'd'],
            query: {e: '1'}
        }, {
            origin: 'http://www.a.com/b/c/d#eee',
            protocol: 'http',
            host: 'www.a.com',
            domain: 'a.com',
            port: 80,
            path: ['b', 'c', 'd'],
            query: {},
            anchor: 'eee'
        }, {
            origin: 'http://www.a.com/b/c/d.html',
            protocol: 'http',
            host: 'www.a.com',
            domain: 'a.com',
            port: 80,
            path: ['b', 'c', 'd'],
            query: {},
            extension: 'html'
        }, {
            origin: 'http://www.a.com/b/c/d.html?e=1',
            protocol: 'http',
            host: 'www.a.com',
            domain: 'a.com',
            port: 80,
            path: ['b', 'c', 'd'],
            query: {e: '1'},
            extension: 'html'
        }, {
            origin: 'http://www.a.com/b/c/d.html#eee',
            protocol: 'http',
            host: 'www.a.com',
            domain: 'a.com',
            port: 80,
            path: ['b', 'c', 'd'],
            query: {},
            extension: 'html',
            anchor: 'eee'
        }];

        for (var i = 0, count = extensionTestCase.length; i < count; i++) {
            var expect = extensionTestCase[i];
            var actual = urlClass.parse(expect.origin);
            assert.deepEqual(actual, expect);
        }
    });

    it('queryTestCase', function () {
        var queryTestCase = [{
            origin: 'http://www.a.com/b/c/d.html?e=1',
            protocol: 'http',
            host: 'www.a.com',
            domain: 'a.com',
            port: 80,
            path: ['b', 'c', 'd'],
            query: {e: '1'},
            extension: 'html'
        }, {
            origin: 'http://www.a.com/b/c/d.html?e=1&f=2',
            protocol: 'http',
            host: 'www.a.com',
            domain: 'a.com',
            port: 80,
            path: ['b', 'c', 'd'],
            query: {e: '1', f: '2'},
            extension: 'html'
        }, {
            origin: 'http://www.a.com/b/c/d.html?e=1&f=2#ggg',
            protocol: 'http',
            host: 'www.a.com',
            domain: 'a.com',
            port: 80,
            path: ['b', 'c', 'd'],
            query: {e: '1', f: '2'},
            extension: 'html',
            anchor: 'ggg'
        }];

        for (var i = 0, count = queryTestCase.length; i < count; i++) {
            var expect = queryTestCase[i];
            var actual = urlClass.parse(expect.origin);
            assert.deepEqual(actual, expect);
        }
    });

    it('anchorTestCase', function () {
        var anchorTestCase = [{
            origin: 'http://www.a.com/b/c/d.html?e=1&f=2',
            protocol: 'http',
            host: 'www.a.com',
            domain: 'a.com',
            port: 80,
            path: ['b', 'c', 'd'],
            query: {e: '1', f: '2'},
            extension: 'html'
        }, {
            origin: 'http://www.a.com/b/c/d.html?e=1&f=2#ggg',
            protocol: 'http',
            host: 'www.a.com',
            domain: 'a.com',
            port: 80,
            path: ['b', 'c', 'd'],
            query: {e: '1', f: '2'},
            extension: 'html',
            anchor: 'ggg'
        }];

        for (var i = 0, count = anchorTestCase.length; i < count; i++) {
            var expect = anchorTestCase[i];
            var actual = urlClass.parse(expect.origin);
            assert.deepEqual(actual, expect);
        }
    });

    it('protocol + host + port', function () {
        var testCase = [{
            origin: 'http://www.a.com/b/c/d.html?e=1&f=2#ggg',
            protocol: 'http',
            host: 'www.a.com',
            port: 80,
            domain: 'a.com',
            path: [],
            query: {}
        }, {
            origin: 'http://www.a.com',
            protocol: 'http',
            host: 'www.a.com',
            port: 80,
            domain: 'a.com',
            path: [],
            query: {}
        }, {
            origin: 'http://www.a.com/',
            protocol: 'http',
            host: 'www.a.com',
            port: 80,
            domain: 'a.com',
            path: [],
            query: {}
        }];

        for (var i = 0, count = testCase.length; i < count; i++) {
            var expect = testCase[i];
            var actual = urlClass.parse(expect.origin, {path: true, query: true, extension: true, anchor: true});
            assert.deepEqual(actual, expect);
        }
    });

    it('host + port', function () {
        var testCase = [{
            origin: 'www.a.com',
            host: 'www.a.com',
            domain: 'a.com',
            path: [],
            query: {}
        }, {
            origin: 'www.a.com:8080',
            host: 'www.a.com',
            domain: 'a.com',
            port: 8080,
            path: [],
            query: {}
        }];

        for (var i = 0, count = testCase.length; i < count; i++) {
            var expect = testCase[i];
            var actual = urlClass.parse(expect.origin, {
                protocol: true,
                path: true,
                query: true,
                extension: true,
                anchor: true
            });
            assert.deepEqual(actual, expect);
        }
    });

    it('host + port + path + extension + query + anchor', function () {
        var testCase = [{
            origin: 'www.a.com/b/c/d.html?e=1&f=2#ggg',
            host: 'www.a.com',
            domain: 'a.com',
            path: ['b', 'c', 'd'],
            query: {e: '1', f: '2'},
            extension: 'html',
            anchor: 'ggg'
        }];

        for (var i = 0, count = testCase.length; i < count; i++) {
            var expect = testCase[i];
            var actual = urlClass.parse(expect.origin, {protocol: true});
            assert.deepEqual(actual, expect);
        }
    });

    it('path + extension + query + anchor', function () {
        var testCase = [{
            origin: '/b/c/d.html?e=1&f=2#ggg',
            path: ['b', 'c', 'd'],
            query: {e: '1', f: '2'},
            extension: 'html',
            anchor: 'ggg'
        }];

        for (var i = 0, count = testCase.length; i < count; i++) {
            var expect = testCase[i];
            var actual = urlClass.parse(expect.origin, {protocol: true, host: true, port: true});
            assert.deepEqual(actual, expect);
        }
    });

});
