const path = require("path");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

const isDev = process.env.NODE_ENV !== "production";

const config = {
  name: "wordrelay-setting",
  mode: isDev ? "development" : "production",
  devtool: !isDev ? "hidden-source-map" : "eval",
  resolve: {
    extensions: [".js", ".jsx"],
  },

  entry: {
    app: "./client",
  },
  target: ["web", "es5"],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        options: {
          presets: [
            [
              "@babel/preset-env",
              {
                targets: {
                  browsers: ["> 1% in KR", "IE 10"],
                },
                debug: true,
              },
            ],
            "@babel/preset-react",
          ],
          plugins: ["react-refresh/babel"],
        },
        exclude: path.join(__dirname, "node_modules"),
      },
    ],
  },
  plugins: [
    new ReactRefreshWebpackPlugin({
      overlay: {
        useURLPolyfill: true,
      },
    }),
  ],
  output: {
    filename: "app.js",
    path: path.join(__dirname, "dist"),
  },
  devServer: {
    publicPath: "/dist",
    hot: true,
  },
};

module.exports = config;
