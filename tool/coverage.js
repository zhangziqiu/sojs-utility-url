/**
 * 代码覆盖率检查
 * @author zhangziqiu<zhangziqiu@qq.com>
 */

require('sojs');
require('sojs-test');

sojs.define({
    name: 'coverage',
    deps: {
        coverageClass: 'sojs.test.coverage'
    },

    /**
     * 静态构造函数
     */
    $coverage: function () {
        this.coverageClass.test();
    }
});
