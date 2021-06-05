module.exports = {
    publicPath: process.env.NODE_ENV === 'production'    ? '/vue-warehouse/'    : '/',
    css: {
      loaderOptions: {
        sass: {
            prependData: `@import '@/assets/global.scss';`
        }
      }
    }
  }