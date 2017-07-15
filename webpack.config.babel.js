const webpack = require("webpack");
const path = require("path");

const { NODE_ENV } = process.env;
const isProduction = NODE_ENV === "production";

const plugins = [
	new webpack.DefinePlugin({
		"process.env.NODE_ENV": JSON.stringify(NODE_ENV),
	}),
];

const filename = `redux-entity-helpers${isProduction ? ".min" : ""}.js`;

if (isProduction) {
	plugins.push(
		new webpack.optimize.UglifyJsPlugin({
			compressor: {
				pure_getters: true,
				unsafe: true,
				unsafe_comps: true,
				screw_ie8: true,
				warnings: false,
			},
		})
	);
}

module.exports = {
	entry: [
		"./src/index",
	],
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: [{ loader: "babel-loader" }]
			}
		]
	},
	output: {
		path: path.join(__dirname, "dist"),
		filename,
		library: "ReduxEntityHelpers",
		libraryTarget: "umd",
	},
	plugins
};
