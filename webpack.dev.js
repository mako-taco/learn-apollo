const path = require("path");
const webpack = require("webpack");

module.exports = [
  makeConfig({
    entry: "./src/server/server.ts",
    name: "server",
    target: "node",
    plugins: [new webpack.IgnorePlugin(/^pg-native$/)],
    configFile: "src/server/tsconfig.json",
  }),
  makeConfig({
    entry: {
      client: "./src/client/client.tsx",
      index: "./src/client/index.html",
    },
    name: "client",
    target: "web",
    configFile: "src/client/tsconfig.json",
  }),
];

function makeConfig({ entry, name, target, plugins = [], configFile = "tsconfig.json" }) {
  if (typeof entry === "string") {
    entry = { [name]: entry };
  }
  return {
    entry,
    target,
    devtool: "source-map",
    watchOptions: {
      poll: true,
      ignored: /node_modules/,
    },
    module: {
      rules: [
        {
          test: /\.(graphql|gql)$/,
          loader: "graphql-tag/loader",
          exclude: /node_modules/,
        },
        {
          test: /\.mjs$/,
          include: /node_modules/,
          type: "javascript/auto",
        },
        {
          test: /\.html$/,
          use: ["file-loader?name=[name].[ext]", "extract-loader", "html-loader"],
        },
        {
          test: /\.tsx?$/,
          loader: "ts-loader",
          exclude: /node_modules/,
          options: {
            configFile,
          },
        },
      ],
    },
    plugins: [...plugins],
    resolve: {
      extensions: [".tsx", ".ts", ".js", ".mjs"],
    },
    output: {
      path: path.resolve(__dirname, "dist", name),
    },
  };
}
