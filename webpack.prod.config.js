const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssPlugin = require('mini-css-extract-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const JavaScriptObfuscator = require('webpack-obfuscator');
const TerserPlugin = require('terser-webpack-plugin');
const nodeModules = path.resolve(__dirname, 'node_modules');
const CopyPlugin = require('copy-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CompressionPlugin = require('compression-webpack-plugin');
const { rules, happyLoaders } = require('./webpack.main.config');

const webpack_prod_config = {
    mode: 'production',
    entry: {
        main: path.resolve(__dirname, './client/index.js'),
    },
    output: {
        path: path.resolve(__dirname, './build'),
        filename: 'bundle.js',
        publicPath: ''
    },
    module: {
        rules,
    },
    resolve: {
        alias: {
            'react': path.resolve(nodeModules, 'react/umd/react.production.min.js'),
            'react-dom': path.resolve(nodeModules, 'react-dom/umd/react-dom.production.min.js'),
            'antd$': path.resolve(__dirname, 'alias/antd.ts'),
            // "@ant-design/icons/lib/dist$": path.resolve(__dirname, 'alias/antd_icon.ts'),
        },
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.less', '.css', '.html', '.json']
    },
    optimization: {
        usedExports: true,
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
        minimizer: [
            new TerserPlugin({
                extractComments: true,
                cache: true,
                parallel: true,
                sourceMap: true,
                terserOptions: {
                    extractComments: 'all',
                    compress: {
                        drop_console: true,
                    },
                }
            }),
        ],
        runtimeChunk: { name: 'runtime' }
    },
    externals: {
        'moment': 'moment',
    },
    plugins: [
        ...happyLoaders,
        new CopyPlugin([
            { from: 'client/static', ignore: ['index.html', '.DS_Store', 'asset/**/*'], },
        ]),
        new webpack.HashedModuleIdsPlugin(),
        new MiniCssPlugin({
            filename: '[name].[contenthash].css',
            chunkFilename: '[name].[contenthash].css'
        }),
        new OptimizeCSSPlugin({}),
        new JavaScriptObfuscator({
            rotateUnicodeArray: true,
        }),
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
            envType: 'PROD',
        }),
        new CompressionPlugin({
            test: /\.js(\?.*)?$/i,
        }),
    ],
}

if (process.env.BUNDLE_ANALYZER === true) {
    webpack_prod_config.plugins.push(new BundleAnalyzerPlugin());
}

module.exports = webpack_prod_config;