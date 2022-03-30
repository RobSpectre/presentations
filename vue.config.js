module.exports = {
  configureWebpack: (config) => {
    config.devtool = 'source-map'
  },
  chainWebpack: config => {
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        console.log(options)
        options.transformAssetUrls = {
          video: ['src', 'poster'],
          source: 'src',
          img: 'src',
          image: ['xlink:href', 'href'],
          use: ['xlink:href', 'href'],
          section: ['data-background-video', 'data-background-image']
        }

        return options
      })
  }
}
