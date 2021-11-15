const htmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require("webpack");

module.exports = {
    mode: 'development',
    resolve: {
        extensions: ['.js', '.jsx'],
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
            'process.env.PUBLIC_URL': JSON.stringify(process.env.PUBLIC_URL),
            'process.env.TICKETS_ENABLED': JSON.stringify(process.env.TICKETS_ENABLED),
            'process.env.C4P_ENABLED': JSON.stringify(process.env.C4P_ENABLED)
        })
    ],
}