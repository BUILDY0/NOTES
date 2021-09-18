(function (modules) {
    const moduleExports = {};

    function __webpack_require__(moduleName) {
        if (moduleExports[moduleName]) { //判断是否重复执行require语句
            return;
        }
        //如果没有重复执行一遍代码
        const module = {};
        module.exports = {};
        modules[moduleName](module, module.exports, __webpack_require__);

        // 把模块中exports输出的变量导出，立即执行函数可以闭包给一个全局变量
        moduleExports[moduleName] = module.exports || "";
        return module.exports;
    }
    return __webpack_require__("./index.js");
})({
    "./index.js": function (module, exports, __webpack_require__) {
        eval("const a = __webpack_require__('./a.js');console.log(\"index_module\");console.log(a.abc());")
    },
    "./a.js": function (module, exports, __webpack_require__) {
        eval("const a = {};a.abc = function () {return \"module_a\"};console.log(a.abc());module.exports = a;require('./b.js');")
    },
    "./b.js": function (module, exports, __webpack_require__) {
        eval("console.log(\"module_b\");")
    }
})