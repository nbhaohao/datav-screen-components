const path = require("path")
const rollupResolve = require('rollup-plugin-node-resolve')
const babel = require("rollup-plugin-babel")
const json = require("@rollup/plugin-json")
const commonJs = require('rollup-plugin-commonjs')
const {terser} = require('rollup-plugin-terser')

const resolve = pathName => path.resolve(__dirname, pathName)

module.exports = {
  input: resolve("./src/index.js"),
  output: [
    {
      name: "datavComponents",
      file: resolve("./dist/datav-components.js"),
      format: "umd"
    },
    {
      name: "datavComponents",
      file: resolve("./dist/datav-components.es.js"),
      format: "es"
    }
  ],
  plugins: [
    // 将第三方依赖和我们自己的代码进行融合
    rollupResolve(),
    commonJs(),
    json(),
    babel({
      exclude: "node_modules/**"
    }),
    terser()
  ],
  external: ['vue']
}