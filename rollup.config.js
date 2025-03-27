import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'
import json from '@rollup/plugin-json'

export default {
  input: 'index.js', // 入口文件
  output: [
    {
      file: 'dist/index.cjs.js', // CommonJS 输出
      format: 'cjs',
      exports: 'auto',
    },
    {
      file: 'dist/index.esm.js', // ESM 输出
      format: 'esm',
      exports: 'auto',
    },
    {
      file: 'dist/index.umd.js', // UMD 输出
      format: 'umd',
      name: '$req', // 替换为你的库名
      plugins: [terser()], // UMD 通常需要压缩
      globals: {
        axios: 'axios',
      },
    },
  ],
  plugins: [
    json(),
    resolve(), // 解析 node_modules 中的模块
    commonjs(), // 将 CommonJS 转换为 ES6
  ],
  // 不需要打包的依赖
  external: ['axios'],
}
