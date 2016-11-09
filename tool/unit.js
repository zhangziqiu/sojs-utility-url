/**
 * 单元测试
 * @author zhangziqiu<zhangziqiu@qq.com>
 */

require('sojs');
require('sojs-test');

sojs.define({
    name: 'unit',
    deps: {
        unitClass: 'sojs.test.unit'
    },

    /**
     * 静态构造函数
     */
    $unit: function () {
        this.unitClass.test();
    }
});
