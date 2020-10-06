import * as path from 'path';
import {Configuration} from 'webpack';

const config: Configuration = {
    target: 'node',
    entry: './src/omni-tags/index.ts',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'omni-tags.js',
        libraryTarget: 'commonjs2',
        devtoolModuleFilenameTemplate: '../[resource-path]',
    },
    devtool: 'source-map',
    externals: {
        vscode: 'commonjs vscode',
    },
    resolve: {extensions: ['.ts', '.js']},
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: [{loader: 'ts-loader'}],
            },
        ],
    },
};
module.exports = config;
