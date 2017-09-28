var webpack = require('webpack')
var path = require('path')
var config = {}

function generateConfig(name) {
	var uglify = name.indexOf('min') > -1
	var config = {
		entry: path.join(__dirname, 'index.js'),
		output: {
			path: path.join(__dirname, 'dist'),
			filename: name + '.js',
			sourceMapFilename: name + '.map',
			library: 'Logger',
			libraryTarget: 'umd'
		},
		node: {
			process: false
		},
		devtool: 'source-map'
	}

	config.plugins = [
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
		})
	]

	if (uglify) {
		config.plugins.push(
			new webpack.optimize.UglifyJsPlugin({
				compressor: {
					warnings: false
				}
			})
		)
	}

	return config
}

// ['logger', 'logger.min'].forEach(function (key) {
// 	config[key] = 
// })

module.exports = generateConfig('logger')