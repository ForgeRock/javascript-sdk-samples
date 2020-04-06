require('dotenv').config({ path: '../.env' })

const path = require('path');

module.exports = (env) => {
  return {
    devtool: 'eval-source-map',
    entry: './src/index.tsx',
    mode: 'production',
    module: {
      rules: [
        {
          test: /\.ts[x]?$/,
          loader: 'ts-loader',
        },
        {
          test: /\.ts[x]?$/,
          loader: 'string-replace-loader',
          options: {
            multiple: [
              { search: '__AM_URL__', replace: process.env.AM_URL },
              { search: '__CLIENT_ID__', replace: process.env.CLIENT_ID },
              { search: '__REALM_PATH__', replace: process.env.REALM_PATH },
              { search: '__REDIRECT_URI__', replace: process.env.REDIRECT_URI },
              { search: '__SCOPE__', replace: process.env.SCOPE },
              { search: '__TREE__', replace: process.env.TREE },
            ]
          }
        }
      ],
    },
    output: {
      filename: 'app.js',
      path: path.resolve('./dist'),
    },
    resolve: {
      extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js'],
    },
    watch: env ? !!env.WATCH : false,
  };
}
