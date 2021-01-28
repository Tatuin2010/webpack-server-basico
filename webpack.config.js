const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssStylePlugin = require('mini-css-extract-plugin');
const OptimiceCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');


module.exports = {
    mode: 'development',
    optimization: {
        minimizer: [new OptimiceCssAssetsPlugin()]
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
            filename: '[name].css',
            ignoreOrder: false
        }),
        new CopyPlugin({
            patterns: [
                { from: 'src/assets', to: 'assets/' },
            ]
        }),
        new CleanWebpackPlugin(),
    ],

}