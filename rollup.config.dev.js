const path = require("path")

const resolve = pathName => path.resolve(__dirname, pathName)

module.exports = {
  input: resolve("./src/index.js"),
  output: {
    name: "datavComponents",
    file: resolve("./dist/datav-components.js"),
    format: "umd"
  }
}