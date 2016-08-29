var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
    entry: {
        slider: [path.join(__dirname, './src/index.js')]
    },
    output: {
        library: 'VueSlider',
        libraryTarget: 'umd',
        path: __dirname+'/build/',
        filename: '[name].js'
    },
    externals: {
        "vue": "vue"
    },
    module: {
        loaders:[
        {
            test: /\.(jpe?g|gif|png)$/,
            loader: 'url-loader?limit=100000'
        },
        {
            test: /\.woff|\.woff2|\.svg|.eot|\.ttf/,
            loader: 'url?prefix=font/&limit=10000'
        },
        {
            test: /\.js$/,
            exclude: /(node_modules)/,
            loader: 'babel?presets[]=es2015'
        },
        {
            // use vue-loader for *.vue files
            test: /\.vue$/,
            loader: 'vue'
        },
        {
            test: /\.css$/,
            loader:ExtractTextPlugin.extract("style-loader?sourceMap", "css-loader?sourceMap")
        },
        {
            test: /\.less$/,
            loader:ExtractTextPlugin.extract("style-loader?sourceMap", "css-loader?sourceMap!less-loader?sourceMap")
        }]
    },
    plugins: [
        new ExtractTextPlugin("slider.css")
    ],
    resolve: {
        //开启后缀自动补全功能
        extensions:['','.js','.vue']
    }
};