const path = require("path");//nodejs里面的基本包，用来处理路径
var webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const isDev = process.env.NODE_ENV === 'development';
const HTMLPlugin = require("html-webpack-plugin"); // 引入模板渲染插件
//__dirname表示文件相对于工程的路径
module.exports = {
    entry: path.join(__dirname, 'src/index.js'),
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'dist')
    },
    plugins: [
        // make sure to include the plugin for the magic
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: isDev ? '"development"' : '"production"'
            }
        }),
        new VueLoaderPlugin(),
        new HTMLPlugin()
    ],
    mode: 'none',
    module: {
        rules: [
            {//通过vue-loader来识别以vue结尾的文件
                test: /.vue$/,
                loader: 'vue-loader'
            },
            {//通过两种loader来识别样式
                test: /.css$/,
                //css的处理方式不同，有嵌入在页面style标签里的，有从外部文件引入的，我们这里用use来声明
                use: [
                    'style-loader',//接受潜在页面内部的style标签的文件。
                    'css-loader'
                ]
            },
            {//stylus预处理
                test: /\.styl$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'stylus-loader'
                ]
            },
            // 还可以babel转码
            // {
            //     test: /\.js$/,
            //     loader: 'babel-loader',
            //     //排除路径
            //     exclude: /node_modules/,
            //     //更为推荐的方式是在.bablerc文件中配置以下设置
            //     options: { // 将es6代码转换成浏览器都支持的es5代码
            //         presets: ['es2015'],
            //         plugins: ['transform-runtime']
            //     }
            // }

            {//处理图片文件
                test: /\.(gif|jpg|jpeg|png|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 1024 * 20, //将所有小于1kb的图片都转为base64形式
                            name: '[name]-aaa.[ext]'
                        }
                    },


                ]
            }
        ]
    },

    // 如果服务器遇到跨域问题，下面是配置代理，解决跨域
    // devServer: { //配置webpack-dev-server -> express服务器的选项
    // host: 'localhost', // A
    // port: 9999,
    // //代理 
    // proxy: { //this.$ajax.get('/v2/xxxx')
    //     '/v2/*': { // 如果当前请求的url 是以/v2开头/xxxxxx,则默认请求127.0.1/v2/xxx
    //         changeOrigin: true, //changeOrigin就把当前本地express服务器由A变为向B请求并返回
    //         target: 'https://api.douban.com/', //B
    //     }
    // }

    // }
}

if(isDev) {
    console.log("is dev~!");
    devServer = {
        // contentBase:path.resolve(__dirname,'dist'),
        // openPage:'index.html',
        // index:"index.html",
        open:true,

        port: 8888,
        host: 'localhost',
        overlay: {
            erros: true,
        }
    }
}

