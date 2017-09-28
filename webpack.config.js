var webpack = require('webpack')
var path = require('path')

var isProduction = process.env.NODE_ENV === 'production'
var name = isProduction ? 'logger.min' : 'logger'
var plugins = []

if(isProduction) {
	plugins.push(
		new webpack.optimize.UglifyJsPlugin({
			compressor: {
				warnings: false
			}
		})
	)
}

module.exports = {
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
	devtool: 'source-map',
	plugins,
}