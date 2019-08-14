const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const GasPlugin = require("gas-webpack-plugin");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const WebpackCleanPlugin = require("webpack-clean");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackInlineSourcePlugin = require("html-webpack-inline-source-plugin");

const destination = "dist";

const htmlPlugin = new HtmlWebpackPlugin({
  template: "./src/client/index.html",
  filename: "index.html",
  inlineSource: ".(js|css)$" // embed all javascript and css inline
});

const htmlWebpackInlineSourcePlugin = new HtmlWebpackInlineSourcePlugin();

const sharedConfigSettings = {
  optimization: {
    minimizer: [
      new UglifyJSPlugin({
        uglifyOptions: {
          warnings: false,
          ie8: true,
          mangle: false,
          compress: {
            properties: false
          },
          output: {
            beautify: true
          }
        }
      })
    ]
  },
  module: {}
};

const eslintConfig = {
  enforce: "pre",
  test: /\.jsx?$/,
  exclude: /node_modules/,
  loader: "eslint-loader",
  options: {
    cache: false,
    failOnError: false,
    fix: true
  }
};

const appsscriptConfig = {
  name: "COPY APPSSCRIPT.JSON",
  entry: "./appsscript.json",
  plugins: [
    new CleanWebpackPlugin([destination]),
    new CopyWebpackPlugin([
      {
        from: "./appsscript.json"
      }
    ])
  ]
};

const clientConfig = Object.assign({}, sharedConfigSettings, {
  name: "CLIENT",
  entry: "./src/client/index.jsx",
  output: {
    path: path.resolve(__dirname, destination)
  },
  resolve: {
    extensions: [".js", ".jsx", ".json"]
  },
  module: {
    rules: [
      // eslintConfig,
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(png|jp(e*)g|svg)$/,  
        use: [ 'file-loader' ]
    }
    ]
  },
  plugins: [
    htmlPlugin,
    new HtmlWebpackInlineSourcePlugin(),
    new WebpackCleanPlugin([destination + "/" + "main.js"])
  ]
});

const serverConfig = Object.assign({}, sharedConfigSettings, {
  name: "SERVER",
  entry: "./src/server/code.js",
  output: {
    filename: "code.js",
    path: path.resolve(__dirname, destination),
    libraryTarget: "this"
  },
  module: {
    rules: [
      // eslintConfig,
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  plugins: [new GasPlugin()]
});

module.exports = [appsscriptConfig, clientConfig, serverConfig];
