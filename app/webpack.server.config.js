const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
    entry: {
        appSSR: path.resolve(__dirname, "src", "app", "appssr.js")
    },

    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "ssr/[name].js",
        publicPath: "/",
        libraryTarget: 'commonjs2',

    },

    target: 'node',

    // devServer: {
    //     port: process.env.PORT || 9000,
    //     // open: true,
    //     hot: true,
    //     // contentBase: path.resolve(__dirname, "dist"),
    //     // para que funcione react router
    //     // historyApiFallback: true
    // },

    module: {
        rules: [
            {
                test: /.css$/,
                use: [
                    // 'style-loader',
                    'css-loader',
                ]
            },

            {
                test: /.jsx?$/,
                resolve: {
                    extensions: [
                        ".js", ".jsx", ".json"
                    ]
                },
                use:'babel-loader',
                exclude: /node_modules/
            },

            {
                test: /\.jpg|png|gif|woff|eot|ttf|svg|mp4|webm$/,
                use: {
                  loader: 'file-loader',
                  options: {
                    outputPath: "assets/"
                    }
                }
              },
        ]
    },

    // plugins: [
    //     new HtmlWebpackPlugin({
    //         title: 'masplay sala de videojuegos',
    //         // que tome este archivo ya creado anteriormete como template
    //         template: path.resolve(__dirname, 'public','index.html')
    //     })
    // ],
    mode: "development"
}