const htmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require("webpack");

module.exports = {
    mode: 'development',
    output: {
        publicPath: '/'
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    devServer: {
        historyApiFallback: true,
        proxy: {
            // '/': {
            //     target: 'http://35.205.221.201/',
            // },
            // '/default': {
            //     //k port-forward svc/broker-ingress -n knative-eventing 8081:80
            //     target: 'http://localhost:8081/default',
            // },

        },
    },
    module: {
        rules: [{test: /\.(js|jsx)$/, exclude: /node_modules/, use: 'babel-loader'},
            {
                test: /\.scss$/,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader",
                ],
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: [
                    "file-loader?context=src/images&name=images/[path][name].[ext]",
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            mozjpeg: {
                                progressive: true,
                            },
                            gifsicle: {
                                interlaced: false,
                            },
                            optipng: {
                                optimizationLevel: 4,
                            },
                            pngquant: {
                                quality: [0.65, 0.90],
                                speed: 4,
                            },
                        },
                    }],
                exclude: /node_modules/,
                include: __dirname,
            },
        ],
    },
    plugins: [
        new htmlWebpackPlugin({
            template: './src/index.html',
        }),
        new webpack.DefinePlugin({
            'process.env.PUBLIC_URL': JSON.stringify(process.env.PUBLIC_URL)
        })
    ],
}