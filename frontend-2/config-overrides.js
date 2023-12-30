const webpack = require("webpack");

module.exports = function override(config, env) {
  // Add your custom Webpack configurations here

  // Add resolve fallbacks for core Node.js modules
  config.resolve.fallback = {
    ...config.resolve.fallback,
    buffer: require.resolve("buffer/"),
    crypto: require.resolve("crypto-browserify"),
    stream: require.resolve("stream-browserify"),
    util: require.resolve("util/"),
  };

  // Add plugins if needed
  config.plugins.push(
    new webpack.ProvidePlugin({
      Buffer: ["buffer", "Buffer"],
      process: "process/browser",
    })
  );

  return config;
};
