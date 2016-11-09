/**
 * 单元测试类
 * @author zhangziqiu<zhangziqiu@qq.com>
 */

var assert = require('assert');
var urlClass = sojs.using('sojs.utility.url');

describe('===== error test =====', function () {

    it('test', function () {
        var protocolTestCase = ['http://www.a.com/../b.html',
            'http://www.a.com/b...html',
            'http://www.a.com/b.html?@=1',
            'http://www.a.com/b.html?c=@'];

        for (var i = 0, count = protocolTestCase.length; i < count; i++) {
            var urlString = protocolTestCase[i];
            var actual = urlClass.parse(urlString);
            assert.deepEqual(actual, null);
        }
    });

    it('allow single "."', function () {
        var protocolTestCase = [{
            origin: 'http://www.a.com/b..html',
            protocol: 'http',
            host: 'www.a.com',
            domain: 'a.com',
            port: 80,
            extension: 'html',
            path: ['b.'],
            query: {}
        }];

        for (var i = 0, count = protocolTestCase.length; i < count; i++) {
            var expect = protocolTestCase[i];
            var actual = urlClass.parse(expect.origin);
            assert.deepEqual(actual, expect);
        }
    });

});
