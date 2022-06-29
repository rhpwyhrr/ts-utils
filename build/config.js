const path = require('path')
const node = require('rollup-plugin-node-resolve') // 支持第三方包
const cjs = require('rollup-plugin-commonjs') // 转commonjs to es
const babel = require('rollup-plugin-babel') // 转为es5
const { terser } = require('rollup-plugin-terser') // 代码压缩
const typescript = require('rollup-plugin-typescript2') 
const json =  require('rollup-plugin-json')
const version = process.env.VERSION || require('../package.json').version

const resolve = p => {
    return path.resolve(__dirname,'../',p);
}

const exclude = [resolve('src/demoTest.ts'),resolve('src/readme.md')]

const banner =  
'/**\n' +
` * ts-utils v${version}\n` +
' */';

const globals = {
    lodash: 'lodash'
}
const external = ['lodash']  // 由于函数用ts编写，使用external外部引用lodash，减少打包体积

// 默认配置
const defaultPlugins = [
    json(),
    node(), // 查找和打包node_modules中的第三方模块
    cjs(),// 将 CommonJS 转换成 ES2015 模块供 Rollup 处理
    typescript({
        tsconfig: "tsconfig.json",
        useTsconfigDeclarationDir: true,
    }),
    babel(),
];

const builds = {
    'ts-utils': {
        entry: resolve('src/index.ts'),
        dest: resolve('lib/ts-utils.js'),
        format: 'umd',
        moduleName: 'Utils', // umd规范一定要有一个名字
        banner,
    },
    'ts-utils-min': {
        entry: resolve('src/index.ts'),
        dest: resolve('lib/ts-utils-min.js'),
        format: 'umd',
        moduleName: 'Utils',
        banner,
        plugins: [...defaultPlugins, terser()],
    },
    'ts-utils-cjs': {
        entry: resolve('src/index.ts'),
        dest: resolve('lib/ts-utils-cjs.js'),
        format: 'cjs',
        banner,
    },
    'ts-utils-esm': {
        entry: resolve('src/index.ts'),
        dest: resolve('lib/ts-utils-esm.js'),
        format: 'esm',
        banner,
    },
}

/**
 * 生成打包配置
 * @param {*} opts 
 */
function getConfig(opts) {
    const config = {
        input: opts.entry,
        external: opts.external || external,
        plugins: opts.plugins || defaultPlugins,
        output: {
            file: opts.dest,
            format: opts.format,
            banner: opts.banner || '',
            name: opts.moduleName || '',
            globals: opts.globals || globals
        },
        onwarn: (msg, warn) => {
            warn(msg);
        }
    }
    return config;
}

if(process.env.TARGET) {
    module.exports = getConfig(builds[process.env.TARGET]);
}else {
    exports.exclude = exclude;
    exports.getConfig = getConfig;
    exports.getAllBuilds = () => Object.values(builds).map(getConfig);
}