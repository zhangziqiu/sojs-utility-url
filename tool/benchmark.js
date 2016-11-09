/**
 * 启动性能测试工具类
 * @author zhangziqiu<zhangziqiu@qq.com>
 */

require('sojs');
require('sojs-test');

sojs.define({
    name: 'benchmark',
    deps: {
        benchmarkClass: 'sojs.test.benchmark'
    },

    /**
     * 静态构造函数
     */
    $benchmark: function () {
        this.benchmarkClass.test();
    }
});


