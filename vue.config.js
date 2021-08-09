module.exports = {
    publicPath: "./", // 公共路径
    outputDir: "dist", // 输出文件目录
    lintOnSave: false,
    productionSourceMap: false,
    devServer: {
        // proxy: {  //配置跨域
        //     '/api': {
        //         target: 'http://localhost:8080',
        //         changOrigin: true,  //允许跨域
        //         pathRewrite: {
        //             '/api': ''
        //         }
        //     },
        // },
        // public:'172.20.3.3:8080',
        port: 9090
    },
}
