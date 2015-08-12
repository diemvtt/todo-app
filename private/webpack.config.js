var path = require('path');
var ROOT_PATH = path.resolve(__dirname);
var webpack = require('webpack');


module.exports = {
    entry: {
        index: path.resolve(ROOT_PATH, 'modules/todoapp/components/index.jsx'),
        serverSide: path.resolve(ROOT_PATH, 'modules/todoapp/components/serverSide.jsx')
    },
    output: {
        path: path.resolve(ROOT_PATH, '../public/javascripts'),
        filename: '[name].js'
    },
    resolve: {
        extensions: ['', '.js', '.jsx'],
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js')
    ],
    module: {
        loaders: [
            {
                test: /\.css$/,
                loaders: ['style', 'css']
            },
            {
                test: /\.jsx?$/,
                loader: 'babel?stage=1',
                include: path.resolve(ROOT_PATH, '.')
            }
        ]
    }
};