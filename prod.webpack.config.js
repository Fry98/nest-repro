const { resolve } = require('path');

const LAZY_IMPORTS = [
  '@nestjs/microservices/microservices-module',
  '@nestjs/websockets/socket-module',
];

module.exports = function(options, webpack) {
  return {
    ...options,
    target: 'node',
    mode: 'production',
    entry: './src/main.ts',
    externals: [],
    plugins: [
      ...options.plugins,
      new webpack.IgnorePlugin({
        checkResource(resource) {
          if (LAZY_IMPORTS.includes(resource)) {
            try {
              require.resolve(resource);
            } catch (err) {
              return true;
            }
          }
          return false;
        },
      })
    ],
    output: {
      ...options.output,
      libraryTarget: 'commonjs2',
      path: resolve(__dirname, 'dist'),
      filename: 'main.js'
    }
  };
};
