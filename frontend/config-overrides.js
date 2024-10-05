//This config-overrides.js code snippet is telling webpack 
//how to resolve the missing dependencies that are needed 
//to support web3 libraries and wallet providers in the browser.
const webpack = require('webpack');
module.exports = function override(config) {
  const fallback = config.resolve.fallback || {};
  Object.assign(fallback, {
    "crypto": require.resolve("crypto-browserify"),
    "stream": require.resolve("stream-browserify"),
    "assert": require.resolve("assert"),
    "http": require.resolve("stream-http"),
    "https": require.resolve("https-browserify"),
    "os": require.resolve("os-browserify"),
    "url": require.resolve("url"),
    'process/browser': require.resolve('process/browser'),
    "timers": require.resolve("timers-browserify")
  })

  config.resolve.fallback = fallback;
  config.plugins = (config.plugins || []).concat([
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer']
    })
  ])

  // let plugs = config.plugins;

  // plugs.push(new webpack.ProvidePlugin({
  //   Buffer: ['buffer', 'Buffer'],
  // }));
  // plugs.push(new webpack.ProvidePlugin({
  //   process: 'process/browser.js'
  // }))

  return config;
}