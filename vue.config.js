const path = require('path')
module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/element-table/docs' : '',
  outputDir: 'docs',
  pages: {
    index: {
      entry: 'examples/main.js',
      template: 'public/index.html',
      filename: 'index.html'
    }
  },
  // 强制内联CSS
  css: { extract: false }
  // chainWebpack: (config) => {
  // if (process.env.NODE_ENV !== 'development') {
  //   config.module
  //     .rule('js')
  //     .include.add(path.join(__dirname, 'packages'))
  //     .end()
  //     .use('babel')
  //     .loader('babel-loader')
  //     .tap((options) => {
  //       return options
  //     })
  // }
  // }
}
