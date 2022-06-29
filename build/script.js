const fs = require('fs')
const path = require('path')
const { rollup } = require('rollup')
const config = require('./config')

let builds = config.getAllBuilds()

// 构建config.js配置的全量包
function buildConfig(builds) {
  let i = 0;
  const total = builds.length;
  const next = () => {
    buildEntry(builds[i]).then(() => {
      i++;
      if (i < total) {
        next()
      }
    }).catch(logError)
  }
  next()
}

// 构建Fn
async function buildEntry(config) {
  let bundle;
  const {input,output:outputOptions} = config
  const { file } = outputOptions;
  try {
    bundle = await rollup(config)
    const {output:[{code}]} = await bundle.generate(outputOptions)
    console.log(`${blue(path.relative(process.cwd(), file))}  ${getSize(code)}`)
    await bundle.write(outputOptions);
  } catch (err){
    logError(err)
  }
  if (bundle) {
    await bundle.close();
  }
  
}

// 获取文件大小
function getSize(code) {
  return `${(code.length / 1024).toFixed(2)}kb`
}

// 输出错误日志
function logError(e) {
  console.log(e)
}

// 设置颜色
function blue(str) {
  return '\x1b[1m\x1b[34m' + str + '\x1b[39m\x1b[22m'
}

// 处理字符串，头字母大写
function firstUpperCase(str) {
  return str.replace(/^\S/,function(s){return s.toUpperCase();});
}

// 导出单个函数
function buildSingleFn(){
  // 循环查找文件
  function finder(filepath){
    const pathArray = fs.readdirSync(filepath)
    pathArray.forEach(item=>{
      const fpath = path.join(filepath, item)
      const stats = fs.statSync(fpath)
      if(stats.isDirectory()) finder(fpath)
      if(stats.isFile()){
        if (config.exclude.includes(fpath)) return;
        if(/(\.d\.ts)$/.test(item)||/(\.md)$/.test(item)) return
        let newItem = item
        if(item === 'index.ts'){
          const _parDir = fpath.split(path.sep).slice(-2,-1)[0];
          if(_parDir !== 'src'){
            newItem = `${_parDir}.ts`
          }
        }
        const moduleName = firstUpperCase(newItem.replace(/(\.ts)$/,''));
        const outputFile = path.resolve(process.cwd(), './lib/'+newItem.replace(/(\.ts)$/,'.js'))

        const rConfig = config.getConfig({
          entry: fpath,
          dest: outputFile,
          format: process.env.FORMAT || 'umd',
          moduleName: `${moduleName}`,
          banner: '/**\n' +
          ` * @desc ${moduleName}\n` +
          ' */'
        })
        
        // let rConfig = {
        //   input: fpath,
        //   plugins: defaultPlugins,
        //   external: ['lodash'],  // 使用external外部引用lodash，减少打包体积
        //   output: {
        //     file: outputFile,
        //     format: process.env.FORMAT || 'umd',
        //     name: `${moduleName}`,
        //     globals: {
        //       lodash:'lodash',
        //     },
        //     banner: '/**\n' +
        //     ` * @desc ${moduleName}\n` +
        //     ' */',
        //   }
        // }
        buildEntry(rConfig);
      }
    })
  }
  finder(path.resolve(__dirname, '../', 'src/'))
}

// 构建打包（全量和单个）
async function build() {
  if (!fs.existsSync(path.resolve(__dirname, '../', 'lib'))) {
    fs.mkdirSync(path.resolve(__dirname, '../', 'lib'))
  }
  Promise.all([buildConfig(builds), buildSingleFn()]).catch(logError)
}

build();