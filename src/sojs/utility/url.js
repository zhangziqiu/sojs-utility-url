/***
 * the fastest url parser in the world.
 * don't support ".com.cn" and so on.
 *
 * @author zhangziqiu<zhangziqiu@qq.com>
 */

sojs.define({
    name: 'url',
    namespace: 'sojs.utility',

    /**
     * 默认端口号
     */
    defaultPort: {
        http: 80,
        https: 443,
        ftp: 21,
        tftp: 69,
        ssh: 22,
        smtp: 25
    },

    /**
     * 解析url, 返回urlObj.
     * @param url {string} 待解析的url字符串
     * @param {Object} ignoreOption 配置忽略扫描的部分.比如明确知道url上不包括端口,则可以忽略端口部分以便加快性能.
     * @param {boolean} ignoreOption.protocol 忽略protocol部分
     * @param {boolean} ignoreOption.host 忽略host部分
     * @param {boolean} ignoreOption.port 忽略port部分
     * @param {boolean} ignoreOption.path 忽略path部分
     * @param {boolean} ignoreOption.extension 忽略extension部分
     * @param {boolean} ignoreOption.query 忽略query部分
     * @param {boolean} ignoreOption.anchor 忽略anchor部分
     * @return {Object} urlObj 解析后的url对象
     * @return {string} urlObj.origin 原始url, 比如: http://www.a.com:8080/b/c/d.html?e=1&f=2#ggg
     * @return {string} urlObj.protocol 协议, 比如: http
     * @return {string} urlObj.host 域名, 比如: www.a.com
     * @return {string} urlObj.port 端口号, 比如: 8080
     * @return {Array}  urlObj.path 路径数组, 比如: [ 'b', 'c', 'd.html' ]
     * @return {string} urlObj.extension 扩展名, 比如: html
     * @return {Object} urlObj.query 包含了所有url参数的map对象, 比如: { e: '1', f: '2' }
     * @return {string} urlObj.anchor 锚点, 比如: ggg
     */
    parse: function (url, ignoreOption) {
        ignoreOption = ignoreOption || {};
        var start = 0;
        var end = url.length - 1;
        var ch;
        var result = { origin: url };

        // Trim leading and trailing ws
        while (url.charCodeAt(start) <= 0x20 /*' '*/) start++;
        while (url.charCodeAt(end) <= 0x20 /*' '*/) end--;
        var endLength = end + 1;

        /*
         ASCII:
         0x20: (space)
         0x23: '#'
         0x26: '&'
         0x2E: '.'
         0x2F: '/'
         0x3A: ':'
         0x3D: '='
         0x3F: '?'
         0x5E: '^'
         */
        // process protocol
        if (!ignoreOption.protocol) {
            for (var i = start; i <= end; ++i) {
                if (url.charCodeAt(i) === 0x3A) {
                    result.protocol = url.slice(start, i);
                    start = i + 3;
                    break;
                }
            }
        }

        // process host
        if (!ignoreOption.host) {
            var pointArray = [];
            for (var i = start; i <= end; ++i) {
                ch = url.charCodeAt(i);

                if (ch === 0x2F) {
                    ignoreOption.port = true;
                    break;
                }
                else if (ch === 0x3A) {
                    break;
                }
                else if (ch === 0x2E) {
                    pointArray.push(i);
                }
            }
            result.host = url.slice(start, i);
            // get domain from host
            if (pointArray.length > 1) {
                result.domain = url.slice(pointArray[pointArray.length - 2] + 1, i);
            }
            else {
                result.domain = result.host;
            }

            start = i + 1;
        }

        // process port
        if (!ignoreOption.port) {
            for (var i = start; i <= end; ++i) {
                ch = url.charCodeAt(i);
                if (ch === 0x2F) {
                    break;
                }
            }
            if (i > start) {
                result.port = url.slice(start, i);
            }
            start = i + 1;
        }
        // convert to int
        if (result.port) {
            result.port = parseInt(result.port, 10);
        }
        else if (result.protocol) {
            // set default port
            var defaultPort = this.defaultPort[result.protocol.toLowerCase()];
            if (defaultPort) {
                result.port = defaultPort;
            }
        }

        // process path
        var pathArray = [];
        if (!ignoreOption.path) {
            var pathBreak = false;
            for (var i = start; i <= endLength; ++i) {
                ch = url.charCodeAt(i);
                if (i === endLength) {
                    ch = 0x2E;
                }

                switch (ch) {
                    case 0x23:
                        ignoreOption.query = true;
                    case 0x3F:
                        ignoreOption.extension = true;
                    case 0x2E:
                        pathBreak = true;
                    case 0x2F:
                        if (i > start) {
                            pathArray.push(url.slice(start, i));
                        }
                        start = i + 1;
                        break;
                    default:
                        // 检测非法字符

                        if ((ch >= 0x61 && ch <= 0x7A)
                            || (ch >= 0x41 && ch <= 0x5A)
                            || (ch >= 0x2F && ch <= 0x39)
                            || ch === 0x5F
                            || ch === 0x2D) {
                        }
                        else {
                            return null;
                        }


                        /*
                         if (ch < 0x30
                         || (ch > 0x39 && ch < 41)
                         || (ch > 0x5A && ch < 0x5F)
                         || ch === 0x60
                         || ch > 0x7A) {
                         return null;
                         }
                         */

                        break;
                }

                if (pathBreak) {
                    break;
                }
            }
        }
        result.path = pathArray;

        // process extension
        if (!ignoreOption.extension) {
            for (var i = start; i <= end; ++i) {
                ch = url.charCodeAt(i);
                if (ch === 0x23) {
                    ignoreOption.query = true;
                    break;
                }
                else if (ch === 0x3F) {
                    break;
                }
                else if (ch === 0x2E) {
                    // 在扫描extension时如果再次遇到'.', 则修改path
                    var lastPathItem = result.path.pop();
                    if (lastPathItem && lastPathItem.charCodeAt(lastPathItem.length - 1) !== 0x2E) {
                        lastPathItem = lastPathItem + url.slice(start - 1, i);
                        result.path.push(lastPathItem);
                        start = i + 1;
                    }
                    else {
                        return null;
                    }
                }
                else {
                    if ((ch >= 0x61 && ch <= 0x7A)
                        || (ch >= 0x41 && ch <= 0x5A)
                        || (ch >= 0x2F && ch <= 0x39)) {
                    }
                    else {
                        return null;
                    }
                }
            }
            if (i > start) {
                result.extension = url.slice(start, i);
            }
            start = i + 1;
        }

        // process query
        var query = {};
        if (!ignoreOption.query) {
            var queryName = '';
            var queryValue;
            for (var i = start; i <= endLength; ++i) {
                ch = url.charCodeAt(i);
                if (i === endLength) {
                    ch = 0x23;
                }

                if (ch === 0x3D) {
                    queryName = url.slice(start, i);
                    start = i + 1;
                }
                else if (ch === 0x23 || ch === 0x26) {
                    if (queryName) {
                        queryValue = url.slice(start, i);
                        if (query[queryName]) {
                            if (query[queryName].length) {
                                // query[queryName] 已经是一个数组了
                                query[queryName].push(queryValue);
                            }
                            else {
                                // 将 query[queryName] 转化为数组
                                query[queryName] = [query[queryName], queryValue];
                            }

                        }
                        else {
                            query[queryName] = queryValue;
                        }
                        queryName = null;
                    }
                    start = i + 1;
                    if (ch === 0x23) {
                        break;
                    }
                }
                else {
                    if ((ch >= 0x61 && ch <= 0x7A)
                        || (ch >= 0x41 && ch <= 0x5A)
                        || (ch >= 0x2E && ch <= 0x39)
                        || ch === 0x5F
                        || ch === 0x2D
                        || ch === 0x25) {
                    }
                    else {
                        return null;
                    }
                }
            }
        }
        result.query = query;

        // process anchor
        if (!ignoreOption.anchor) {
            if (endLength > start) {
                result.anchor = url.slice(start, endLength);
            }
        }

        return result;
    }

});