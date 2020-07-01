module.exports = {
  proxy: {
    '/api': {
      // 测试环境
      target: 'localhost:8080/', // 接口域名1
      changeOrigin: true, //是否跨域
      pathRewrite: {
        '^/api': '' //需要rewrite重写的,
      }
    }
  },
}