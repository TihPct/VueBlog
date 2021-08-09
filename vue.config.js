module.exports = {
    publicPath: "./", // 公共路径
    outputDir: "dist", // 输出文件目录
    lintOnSave: false,
    productionSourceMap: false,
    devServer: {
        proxy: {  //配置跨域
            '/api': {
                target: 'https://afett-dev.coding.net/p/for_server/d/Lockexe/git/raw/master/Data_Json?download=false',
                changOrigin: true,  //允许跨域
                pathRewrite: {
                    '/api': ''
                }
            },
        },
        // public:'172.20.3.3:8080',
        port: 9090
    },
}
