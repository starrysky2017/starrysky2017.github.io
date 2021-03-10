const os = require('os');
const HappyPack = require('happypack');
const threadPoolCount = os.cpus().length;
const happyThreadPool = HappyPack.ThreadPool({ size: threadPoolCount });

const happyLoaders = [
    //happypack for js
    new HappyPack({
        id: 'js',
        threadPool: happyThreadPool,
        loaders: [{
            loader: 'babel-loader',
            options: {
                presets: ['es2015', 'react', 'stage-0']
            }
        }],
        verbose: true,
    }),
    //happypack for less
    new HappyPack({
        id: 'less',
        threadPool: happyThreadPool,
        loaders: [{
            loader: 'style-loader',
        }, {
            loader: 'css-loader',
            options: {
                sourceMap: false,
                modules:true,
            }
        },
            'resolve-url-loader',
        {
            loader: 'less-loader',
            options: {
                sourceMap: false,
                javascriptEnabled: true,
                importLoaders: 2,
            }
        }
        ],
        verbose: true,
    }),
    //happypack for less
    new HappyPack({
        id: 'antd_less',
        threadPool: happyThreadPool,
        loaders: [{
            loader: 'style-loader',
        }, {
            loader: 'css-loader',
            options: {
                sourceMap: false,
            }
        },
        'resolve-url-loader',
        {
            loader: 'less-loader',
            options: {
                sourceMap: false,
                javascriptEnabled: true,
                importLoaders: 2,
            }
        }
        ],
        verbose: true,
    }),    
];

const rules = [
    {
        test: /\.(ts|tsx)$/,
        loader: "awesome-typescript-loader"
    },
    {
        test: /(\.less|\.css)$/,
        exclude: [/node_modules|antd\.less/],
        loaders: ['happypack/loader?id=less'],
    },
    {
        test: /(\.less|\.css)$/,
        include: [/node_modules|antd\.less/],
        loaders: ['happypack/loader?id=antd_less']
    },
    {
        test: /\.(js|jsx)$/,
        exclude: [/node_modules/],
        loaders: ['happypack/loader?id=js'],
    },
    {
        test: /\.(jpe?g|png|woff|woff2|eot|ttf|svg|ico)$/,
        use: [
            {
                loader: 'url-loader',
                options: {
                    limit: 8 * 1024 * 1024
                }
            }
        ]
    },
    {
        test: /package\.json$/,
        loader: 'package-json-cleanup-loader',
        options: {
            only: ['version', 'name']
        }
    },
];

module.exports = {
    rules,
    happyLoaders,
}