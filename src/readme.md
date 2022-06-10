# 关于针对土巴兔加密文件（to8torsaszb.js）修改的说明

===============

1. 由于 to8torsaszb.js 完全依赖浏览器环境，加密逻辑包含有 window,navigator 等浏览器内置对象，整合纯 ts 工具函数会报错，所以在整理的过程中对其进行代码兼容修改。
2. 全局声明 window,如 var window = typeof window!=="undefined"?window:global;使 window.Base64|window.Hex|window.ASN1 等赋值时不会报错
3. 函数体中 j_lm&&"Microsoft Internet Explorer"==navigator.appName 改为 j_lm&&typeof navigator!=="undefined"&&"Microsoft Internet Explorer"==navigator.appName，补充 typeof navigator!=="undefined"判断
4. 函数体中 window.crypto&&window.crypto.getRandomValues 改为 typeof window!=="undefined"&&window.crypto&&window.crypto.getRandomValues,同理补充 typeof window!=="undefined"条件
5. 其它不一一列举
