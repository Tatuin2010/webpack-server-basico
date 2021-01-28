const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssStylePlugin = require('mini-css-extract-plugin');
const OptimiceCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MinifyPlugin = require('babel-minify-webpack-plugin');

module.exports = {
    mode: 'production',
    optimization: {
        minimizer: [new OptimiceCssAssetsPlugin()]
    },
    output: {
        filename: 'main.[contenthash].js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [{
                test: /\.less$/i,
                use: [MiniCssStylePlugin.loader, 'css-loader', 'less-loader']
            },
            {
                test: /\.html$/i,
                loader: 'html-loader',
                options: { attributes: false, minimize: false },
            },
            {
                test: /\.(png|svg|gif)$/,
                use: [{ loader: 'file-loader', options: { esModule: false } }]
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: './src/index.html',
            filename: './index.html'
        }),
        new MiniCssStylePlugin({
            filename: './css/[name].[contenthash].css',
            ignoreOrder: false
        }),
        new CopyPlugin({
            patterns: [
                { from: 'src/assets', to: 'assets/' },
            ]
        }),
        new CleanWebpackPlugin(),
        new MinifyPlugin(),
    ],


}