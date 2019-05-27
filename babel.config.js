const path = require('path');

module.exports = function(api) {
  api.cache(true);

  return {
    presets: ['@babel/preset-env', '@babel/preset-react'],
    plugins: [
      [
        'module-resolver',
        {
          root: [path.resolve('./src')],
        },
      ],
    ],
  };
};
