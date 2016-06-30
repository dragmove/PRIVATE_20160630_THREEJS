
var webpack = require('webpack'),
    path = require('path');

module.exports = {
    devtool: 'eval-source-map',

    // webpack-dev-server options
    devServer: {
        contentBase: './app',
        colors: true,
        noInfo: true, //  --no-info option
        // host: '',
        port: 9001,
        hot: true,
        inline: true
    },

	context: __dirname,

    entry: {
    	main: ['webpack/hot/dev-server', 'babel-polyfill', './app/src/main.js'],
      canvas: ['webpack/hot/dev-server', 'babel-polyfill', './app/src/canvas.js']
        /*
        kanban: ['webpack/hot/dev-server', 'babel-polyfill', './app/src/kanban.js'],
        search: ['webpack/hot/dev-server', 'babel-polyfill', './app/src/search.js'],
        test: ['webpack/hot/dev-server', 'babel-polyfill', './app/src/test.js'],
        route: ['webpack/hot/dev-server', 'babel-polyfill', './app/src/route.js'],
        flux: ['webpack/hot/dev-server', 'babel-polyfill', './app/src/flux.js'],
        perf: ['webpack/hot/dev-server', 'babel-polyfill', './app/src/perf.js']
        */
    },

    output: {
        path: __dirname +'/app/build',
        filename: "[name].js"
    },

    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" },

            { test: /\.jsx?$/, loaders: ['react-hot', 'babel'], exclude: /(node_modules|bower_components)/ }

            /*
            { 
            	test: /\.js$/, 
            	exclude: /(node_modules|bower_components)/,
            	loader: 'babel-loader'
            },
            {
            	test: /\.js$/, 
            	exclude: /(node_modules|bower_components)/,
            	loader: 'react-hot'
            }
            */
        ]
    },

    plugins: [
		// new webpack.optimize.CommonsChunkPlugin('common.js'),

		new webpack.HotModuleReplacementPlugin(),

		// uglify
		new webpack.optimize.UglifyJsPlugin({
			compress: {
                drop_console: false,
				warnings: false
			},
			sourceMap: false,
			mangle: false // true
		})
	],

    resolve: {
    	// you can now require('file') instead of require('file.coffee')
		extension: ['', '.js', '.json', '.coffee']
    }
};