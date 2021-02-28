const path = require("path")
const rollupResolve = require('rollup-plugin-node-resolve')
const babel = require("rollup-plugin-babel")
const json = require("@rollup/plugin-json")
const commonJs = require('rollup-plugin-commonjs')
const extensions = require("rollup-plugin-extensions");
const vuePlugin = require("rollup-plugin-vue")
const postcss = require("rollup-plugin-postcss");

const resolve = pathName => path.resolve(__dirname, pathName)

module.exports = {
  input: resolve("./src/index.js"),
  output: [
    {
      name: "datavComponents",
      file: resolve("./dist/datav-components.js"),
      format: "umd",
      globals: {
        "vue": "vue"
      }
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
    json(),
    vuePlugin(),
    postcss({
      plugins: []
    }),
    commonJs(),
    babel({
      exclude: "node_modules/**"
    }),
    extensions({
      // Supporting Typescript files
      // Uses ".mjs, .js" by default
      extensions: ['.js', '.vue'],
      // Resolves index dir files based on supplied extensions
      // This is enable by default
      resolveIndex: true,
    }),
  ],
  external: ['vue']
}