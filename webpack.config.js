const path = require('path');
const isProduction = process.env.NODE_ENV === 'production';
const webpack = require('webpack');
require('dotenv').config({ path: './.env' });
const stylesHandler = 'style-loader';
const SRC_DIR = path.join(__dirname, './client/src');
const DSC_DIR = path.join(__dirname, './client/dist');

const config = {
    entry: `${SRC_DIR}/index.jsx`,
    output: {
        path: DSC_DIR,
        filename: 'main.js'
    },

    plugins: [
    new webpack.DefinePlugin({
        "process.env": JSON.stringify(process.env),
      }),
    ],

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/i,
                loader: 'babel-loader',
            },
            {
                test: /\.css$/i,
                use: [stylesHandler,'css-loader'],
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
                type: 'asset',
            }
        ]
    }
};

module.exports = () => {
    if (isProduction) {
        config.mode = 'production';
    } else {
        config.mode = 'development';
    }
    return config;
};
