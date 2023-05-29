const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// Webpack Uses this path for managing the directories
const path = require('path');



// This is the main configuration object.
// Here, We write diffrent options and tell webpack what to do
module.exports = {
    // Path to the entry point. From this file, WebPack will begin
    entry: './src/javascript',

    // Path and Filename of my resultant bundle.
    //WebPack will bundle all my javascript into this file.
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '',
        filename: 'bundle.js'
    },



    module:{
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                // Either of scss, sass or css
                test: /\.(sc|sa|c)ss/,
    
                // Set loaders to transform files.
                // Loaders are applying from right to left(!)
                // The first loader will be applied after others
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        // Lastly, This loader resolves url() and @imports inside CSS
                        loader: 'css-loader'
                    },
                    {
                        // Second, we apply postCSS fixes like autoprefixer and minifying
                        loader: 'postcss-loader'
                    },
                    {
                        // First, we transform SASS to standard CSS
                        loader: 'sass-loader',
                        options: {
                            implementation: require("sass")
                        }
                    }
                ]
            }
        ]
    },

    plugins: [
        new MiniCssExtractPlugin({
            filename: 'bundle.css'
        })
    ],

    // Default mode for Webpack is production.
    // Depending on mode Webpack will apply different things
    // on the final bundle. For now, we don't need production's JavaScript 
    // minifying and other things, so let's set mode to development
    mode: 'development'
}