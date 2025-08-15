#!/usr/bin/env node

/**
 * SCSS 转 CSS 批量转换工具
 * 使用方法：
 * node convert-scss.js <scss文件路径>
 *
 * 示例：
 * node convert-scss.js src/components/MyComponent/style.scss
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// 获取命令行参数
const scssFile = process.argv[2];

if (!scssFile) {
  console.log('❌ 请提供 SCSS 文件路径');
  console.log('使用方法: node convert-scss.js <scss文件路径>');
  console.log('示例: node convert-scss.js src/components/MyComponent/style.scss');
  process.exit(1);
}

// 检查文件是否存在
if (!fs.existsSync(scssFile)) {
  console.log(`❌ 文件不存在: ${scssFile}`);
  process.exit(1);
}

// 检查是否是 SCSS 文件
if (!scssFile.endsWith('.scss')) {
  console.log('❌ 请提供 .scss 文件');
  process.exit(1);
}

// 生成 CSS 文件路径
const cssFile = scssFile.replace('.scss', '.css');

try {
  console.log(`🔄 正在转换: ${scssFile} -> ${cssFile}`);

  // 执行 sass 编译
  execSync(`sass "${scssFile}" "${cssFile}" --load-path=src/styles --style=expanded`, {
    stdio: 'inherit'
  });

  console.log(`✅ 转换完成: ${cssFile}`);

  // 查找对应的 TSX/JSX 文件并更新导入
  const dir = path.dirname(scssFile);
  const basename = path.basename(scssFile, '.scss');

  // 查找可能的组件文件
  const possibleFiles = [
    path.join(dir, 'index.tsx'),
    path.join(dir, 'index.jsx'),
    path.join(dir, `${basename}.tsx`),
    path.join(dir, `${basename}.jsx`)
  ];

  for (const file of possibleFiles) {
    if (fs.existsSync(file)) {
      try {
        let content = fs.readFileSync(file, 'utf8');
        const scssImport = path.basename(scssFile);
        const cssImport = path.basename(cssFile);

        // 更新导入语句
        const updated = content.replace(
          new RegExp(`(['"])!?\\./${scssImport.replace('.', '\\.')}\\1`, 'g'),
          `$1!./${cssImport}$1`
        );

        if (updated !== content) {
          fs.writeFileSync(file, updated, 'utf8');
          console.log(`📝 已更新导入语句: ${file}`);
        }
      } catch (error) {
        console.log(`⚠️  更新导入语句失败: ${file} - ${error.message}`);
      }
    }
  }

  console.log(`\n🎉 所有操作完成！`);
  console.log(`📁 生成的文件: ${cssFile}`);

} catch (error) {
  console.log(`❌ 转换失败: ${error.message}`);
  process.exit(1);
}