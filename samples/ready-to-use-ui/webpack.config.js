require('dotenv').config({ path: '../.env' })

const { exec } = require('child_process');
const path = require('path');

module.exports = (env) => {
  return {
    devtool: 'eval-source-map',
    entry: './src/index.js',
    mode: 'production',
    module: {
      rules: [
        {
          test: /\.js$/,
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
      filename: 'custom.js',
      path: path.resolve('./dist'),
    },
    plugins: [{
      apply: (compiler) => {
        compiler.hooks.afterEmit.tap('AfterEmitPlugin', () => {
          const bundlePath = 'node_modules/@forgerock/javascript-sdk-ui/bundles';
          const distPath = './dist';
          const cmds = [
            `cpy ${bundlePath}/index.js ${distPath} --rename=fr-sdk-ui.js`,
            `cpy ${bundlePath}/fr-ui.css ${distPath}`,
          ];
          for (var cmd of cmds) {
            exec(cmd, (err, stdout, stderr) => {
              if (err) {
                console.error(err);
                return;
              }

              if (stdout) process.stdout.write(stdout);
              if (stderr) process.stderr.write(stderr);
            });
            console.log('Copied SDK bundles.');
          }
        });
      }
    }],
    resolve: {
      extensions: ['.webpack.js', '.web.js', '.js'],
    },
    watch: env ? !!env.WATCH : false,
  };
}
