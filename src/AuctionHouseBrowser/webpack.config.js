/// <binding AfterBuild='Run - Development' />
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var webpack = require("webpack");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var CleanWebpackPlugin = require('clean-webpack-plugin');


var path = require('path');
var _root = path.resolve(__dirname, '..');

module.exports = {
    entry: {
        "polyfills": "./client/polyfills.ts",
        "vendor": "./client/vendor.ts",
        "app": "./client/app/main.ts"
    },
    resolve: {
        extensions: ['', '.ts', '.js', '.json', '.css', '.scss', '.html']
    },
    output: {
        path: "./wwwroot",
        filename: "js/[name]-[hash:8].bundle.js"
    },

    module: {
        loaders: [
            {
                test: /\.ts$/,
                loader: "awesome-typescript-loader!angular2-template-loader"
            },
            {
                test: /\.html$/,
                loader: "html"
            },
            {
                test: /\.(png|jpg|gif|ico|woff|woff2|ttf|svg|eot)$/,
                loader: "file?name=assets/[name]-[hash:6].[ext]",
            },

            // Load css files which are required in vendor.ts
            {
                test: /\.css$/,
                exclude: './client/app',
                loader: ExtractTextPlugin.extract('style', 'css?sourceMap')
            },

            {
                test: /\.css$/,
                include: root('client', 'app'),
                loader: 'raw'
            },

            {
                test: /\.less$/,
                loader: 'style-loader!css-loader!less-loader'
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin("css/[name]-[hash:8].bundle.css"),
        new webpack.optimize.CommonsChunkPlugin({
            name: ["app", "vendor", "polyfills"]
        }),

        new webpack.ProvidePlugin({
            jQuery: 'jquery',
            $: 'jquery',
            jquery: 'jquery'
        }),

        // inject in index.html
        new HtmlWebpackPlugin({
            template: "./client/index.html",
            inject: "body"
        }),

        new CleanWebpackPlugin(
            [
                "./wwwroot/*"
            ]
        )
    ],
    devServer: {
        historyApiFallback: true,
        stats: "minimal"
    }
};

function root(args) {
    args = Array.prototype.slice.call(arguments, 0);
    return path.join.apply(path, [_root].concat(args));
}