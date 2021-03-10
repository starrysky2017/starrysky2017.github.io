const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { port, isSSL } = require('./client/config');
const node_modules = path.resolve(__dirname, 'node_modules');
const { rules, happyLoaders } = require('./webpack.main.config');

let _port = port;
let _httpProtocol = 'http';

if (isSSL) {
    _httpProtocol = 'https';
}

const webpack_dev_config = {
    mode: 'development',
    entry: {
        main: path.resolve(__dirname, './client/index'),
    },
    output: {
        path: path.resolve(__dirname, './build'),
        filename: 'bundle.js',
        publicPath: ''
    },
    target: 'web',
    devtool: 'eval',
    devServer: {
        compress: true,
        port: _port,
        host: '0.0.0.0',
        hot: true,
        inline: true,
        historyApiFallback: true,
        disableHostCheck: true,
        publicPath: '',
    },
    module: {
        rules,
    },
    resolve: {
        alias: {
            'react': path.resolve(node_modules, 'react/umd/react.production.min.js'),
            'react-dom': path.resolve(node_modules, 'react-dom/umd/react-dom.production.min.js'),
            'antd$': path.resolve(__dirname, 'alias/antd.ts'),
            // "@ant-design/icons/lib/dist$": path.resolve(__dirname, 'alias/antd_icon.ts'),
        },
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.less', '.css', '.html', '.json']
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                styles: {
                    name: 'styles',
                    test: module => module.nameForCondition &&
                        /\.(css|s[ac]ss)$/.test(module.nameForCondition()) &&
                        !/^javascript/.test(module.type),
                    chunks: 'all',
                    enforce: true,
                },
                vendors: {
                    test: chunk => (
                        chunk.resource &&
                        /\.js$/.test(chunk.resource) &&
                        /node_modules/.test(chunk.resource)
                    ),
                    chunks: 'initial',
                    name: 'vendors',
                },
            }
        },
        runtimeChunk: { name: 'runtime' }
    },
    plugins: [
        ...happyLoaders,
        new CopyPlugin([
            { from: 'client/static', ignore: ['index.html', '.DS_Store', 'asset/**/*'], },
        ]),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.resolve(__dirname, 'client/static/index.html'),
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true,
                minifyCSS: true,
                minifyJS: true,
            },
            envType: 'DEV',
        }),
    ]
}

module.exports = webpack_dev_config;