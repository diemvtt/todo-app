var path = require('path');
var ROOT_PATH = path.resolve(__dirname);


module.exports = {
    entry: [
        path.resolve(ROOT_PATH, 'modules/todoapp/components/index.jsx'),
    ],
    output: {
        path: path.resolve(ROOT_PATH, '../public/javascripts'),
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['', '.js', '.jsx'],
    },
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
        ],
    },
};