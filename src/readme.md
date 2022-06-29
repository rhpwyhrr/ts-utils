# 加密模块（feature/encrypt）

---

- 基于 jsencrypt（https://www.npmjs.com/package/jsencrypt）
- 由于 jsencrypt 依赖浏览器环境，需要对打包后的代码做兼容修改，使整合进 ts 工具函数不会报错
- 使用 window 或者 navigator 的地方需要进行 typeof 判断限制

- 步骤：

1. clone 源码到本地，修改 lib/jsbn/rng.ts 文件，增加一行

```
const inBrowser = typeof window === "undefined" ? false : true;
```

给使用 window 对象的地方加上 inBrowser&&判断限制

2. 打包之后对 bin/jsencrypt.js 做修改,然后将出现打包后的源码 bin&lib 文件夹直接覆盖 ts 工具库里 jsencrypt 模块下的

```
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["JSEncrypt"] = factory();
	else
		root["JSEncrypt"] = factory();
})(window, function() {...})
```

修改为

```
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["JSEncrypt"] = factory();
	else
		root["JSEncrypt"] = factory();
})(typeof window !== "undefined" ? window : {}, function() {...})
```
