const { sassPlugin } = require('esbuild-sass-plugin');

module.exports = config => {
  // 配置字体文件 loader
  config.loader = config.loader || {};
  Object.assign(config.loader, {
    '.ttf': 'file',
    '.woff': 'file',
    '.woff2': 'file',
    '.eot': 'file',
    '.otf': 'file'
  });

  // 配置资源文件输出路径
  config.assetNames = config.assetNames || 'assets/[name]-[hash][ext]';

  config.plugins.push(sassPlugin({
    loadPaths: ['src/styles'],
    // 确保 SASS 插件能正确处理字体文件引用
    type: 'css'
  }));

  return config;
};