module.exports = {
  publicPath:
    process.env.VUE_APP_WORLD === 'serve' ||
    process.env.VUE_APP_WORLD === 'test'
      ? './'
      : 'cdn',
  devServer: {
    open: true,
    port: 5060,
    hot: true,
    quiet: true,
    hotOnly: true,
    disableHostCheck: true //webpack4.0 开启热更新
  },
  lintOnSave: true
};
