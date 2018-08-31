import * as webpack from 'webpack';
import * as path from 'path';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';
import * as ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
export default (environment = 'development') => {
    return {
        mode: 'development',
        devtool: 'eval',
        entry: path.join(__dirname, 'demo', 'entry.ts'),
        output: {
            filename: '[name].js'
        },
        module: {
            rules: [
                {
                    test: /\.ts$/,
                    loader: 'tslint-loader',
                    exclude: /node_modules/,
                    enforce: 'pre'
                },
                {
                    test: /\.ts$/,
                    loader: 'ts-loader',
                    exclude: /node_modules/,
                    options: {
                        transpileOnly: true
                    }
                },
                {
                    test: /\.html$/,
                    loader: 'html-loader',
                    options: {
                        attrs: [':data-src']
                    }
                },
                {
                    test: /\.scss$/,
                    use: [{
                        loader: 'style-loader' // creates style nodes from JS strings
                    }, {
                        loader: 'css-loader' // translates CSS into CommonJS
                    }, {
                        loader: 'sass-loader' // compiles Sass to CSS
                    }]
                },
                {
                    test: /\.(svg|png|jpg|gif)$/,
                    use: [
                        {
                            loader: 'url-loader',
                            options: {
                                limit: 8192
                            }
                        }
                    ]
                }
            ]
        },
        resolve: {
            extensions: ['.ts', '.js']
        },
        devServer: {
            // host: '0.0.0.0', // for Docker development
            port: 8000,
            inline: true,
            hot: true,
            historyApiFallback: true,
            overlay: true
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin(),
            new ForkTsCheckerWebpackPlugin({
                watch: ['./src', './demo'],
                formatter: 'codeframe'
            }),
            new webpack.DefinePlugin({
                ENV: JSON.stringify(environment)
            }),
            new webpack.ContextReplacementPlugin(
                /\@angular(\\|\/)core(\\|\/)fesm5/,
                path.join(__dirname, 'src')
            ),
            new HtmlWebpackPlugin({
                template: path.join(__dirname, 'demo', 'index.ejs')
            })
        ]
    };
};
