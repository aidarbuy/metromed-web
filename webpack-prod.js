const path = require('path');
const buildPath = path.resolve(__dirname, 'build');
const nodeModulesPath = path.resolve(__dirname, 'node_modules');
const plugins = require('webpack-load-plugins')();
const webpack = require('webpack');

const config = {
  entry: [path.join(__dirname, '/src/app/app.js')],
  resolve: {
    //When require, do not have to add these extensions to file's name
    extensions: ["", ".js"],
    //node_modules: ["web_modules", "node_modules"]  (Default Settings)
  },
  //Render source-map file for final build
  // devtool: 'source-map',
  devtool: null,
  //output config
  output: {
    path: buildPath,    //Path of output file
    filename: 'app.js',  //Name of output file
    publicPath: '/',
    chunkFilename: "[id].bundle.js",
  },
  plugins: [
    new plugins.clean(['build'], {
      root: '/', // location of webpack.config.
      verbose: true, // Write logs to console.
      dry: true // Do not delete anything, good for testing.
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    //Minify the bundle
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        //supresses warnings, usually from module minification
        warnings: false,
      },
      mangle: false,
      sourcemap: false,
    }),
    //Allows error warnings but does not stop compiling. Will remove when eslint is added
    new webpack.NoErrorsPlugin(),
    //Transfer Files
    new plugins.transfer(
      [ {from: 'www'} ],
      path.resolve(__dirname,"src")
    ),
    // new webpack.optimize.DedupePlugin(),
    // new webpack.optimize.OccurenceOrderPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.js$/, // All .js files
        loaders: ['babel-loader'], // babel loads jsx and es6-7
        exclude: [nodeModulesPath],
      },
      // {
        /* When you encounter images, compress them 
        with image-webpack (wrapper around imagemin)
        and then inline them as data64 URLs
        */
        // test: /.*\.(gif|png|jpe?g|svg)$/i,
        // loaders: ['url', 'image-webpack'],
      // },
      {
        // Minify PNG, JPEG, GIF and SVG images with imagemin
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          'file?hash=sha512&digest=hex&name=[hash].[ext]',
          'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
        ]
      },
      // {
        /* When you encounter SCSS files, 
        parse them with node-sass, 
        then pass autoprefixer on them
        then return the results as a string of CSS
        */
        // test: /\.scss/,
        // loaders: ['css', 'autoprefixer', 'sass'],
      // }
      {
        // sass-loader
        test: /\.scss$/,  //All .scss files
        loaders: ['style', 'css', 'sass'], //react-hot is like browser sync and babel loads jsx and es6-7
        exclude: [nodeModulesPath],
      },
    ],
  },
  //Eslint config
  eslint: {
    configFile: '.eslintrc', //Rules for eslint
  },
};

module.exports = config;
