// @ts-nocheck
// 使用示例
const config = require('../../a.json');

// types.ts
interface TextStudioConfig {
  text?: string;
  font?: {
    size?: number;
    weight?: string;
    name?: string;
    src?: string;
  };
  depth?: {
    editable?: number;
    active?: number;
    length?: number;
    angle?: number;
    fill?: {
      alpha?: number;
      color?: RGB;
      gradient?: Gradient;
    };
  };
  outline?: {
    global?: {
      width?: number;
      join?: string;
      fill?: {
        alpha?: number;
        color?: RGB;
        gradient?: Gradient;
      };
    };
  };
  shadow?: {
    outer?: {
      active?: number;
      size?: number;
      strength?: number;
      distance?: number;
      angle?: number;
      fill?: {
        alpha?: number;
        color?: RGB;
      };
    };
  };
}

// parser.ts
function createSVGEffect(config: TextStudioConfig, text: string) {
  // 使用默认值
  const defaultConfig: TextStudioConfig = {
    text: text,
    font: {
      size: 72,
      weight: 'bold',
      name: 'Arial Black'
    },
    depth: {
      active: 0,
      length: 0.1,
      angle: 135,
      fill: {
        alpha: 1,
        color: { r: 0, g: 0, b: 0 },
        gradient: {
          active: 0,
          angle: 0,
          colors: []
        }
      }
    }
  };

  // 合并配置
  const mergedConfig = deepMerge(defaultConfig, config);

  const svgContent = `
    <svg viewBox="0 0 800 300">
      <defs>
        ${createGradients(mergedConfig)}
        ${createFilters(mergedConfig)}
      </defs>

      <g transform="translate(400, 150)">
        ${createTextLayers(mergedConfig)}
      </g>
    </svg>
  `;

  return svgContent;
}

function createGradients(config: TextStudioConfig) {
  const gradients = [];

  // 主渐变
  if (config.depth?.fill?.gradient?.active) {
    const colors = config.depth.fill.gradient.colors ?? [];
    gradients.push(`
      <linearGradient id="mainGradient"
        x1="0%" y1="0%"
        x2="0%" y2="100%"
        gradientTransform="rotate(${config.depth.fill.gradient.angle ?? 0})">
        ${colors.map(color => `
          <stop offset="${(color.pos ?? 0) * 100}%"
            stop-color="rgb(${color.r ?? 0},${color.g ?? 0},${color.b ?? 0})"
            stop-opacity="${color.a ?? 1}"/>
        `).join('')}
      </linearGradient>
    `);
  }

  // 轮廓渐变
  if (config.outline?.global?.fill?.gradient?.active) {
    const colors = config.outline.global.fill.gradient.colors ?? [];
    gradients.push(`
      <linearGradient id="outlineGradient"
        x1="0%" y1="0%"
        x2="0%" y2="100%"
        gradientTransform="rotate(${config.outline.global.fill.gradient.angle ?? 0})">
        ${colors.map(color => `
          <stop offset="${(color.pos ?? 0) * 100}%"
            stop-color="rgb(${color.r ?? 0},${color.g ?? 0},${color.b ?? 0})"
            stop-opacity="${color.a ?? 1}"/>
        `).join('')}
      </linearGradient>
    `);
  }

  return gradients.join('\n');
}

function createFilters(config: TextStudioConfig) {
  return `
    <filter id="textEffect">
      <!-- 深度效果 -->
      ${config.depth?.active ? `
        <feOffset
          dx="${Math.cos((config.depth.angle ?? 135) * Math.PI / 180) * (config.depth.length ?? 0.1) * 50}"
          dy="${Math.sin((config.depth.angle ?? 135) * Math.PI / 180) * (config.depth.length ?? 0.1) * 50}"
          in="SourceAlpha"
          result="depthOffset"/>
        <feFlood
          flood-color="rgb(${config.depth?.fill?.color?.r ?? 0},${config.depth?.fill?.color?.g ?? 0},${config.depth?.fill?.color?.b ?? 0})"
          flood-opacity="${config.depth?.fill?.alpha ?? 1}"/>
        <feComposite operator="in" in2="depthOffset"/>
      ` : ''}

      <!-- 外阴影 -->
      ${config.shadow?.outer?.active ? `
        <feOffset
          dx="${Math.cos((config.shadow.outer.angle ?? 135) * Math.PI / 180) * (config.shadow.outer.distance ?? 0.1) * 50}"
          dy="${Math.sin((config.shadow.outer.angle ?? 135) * Math.PI / 180) * (config.shadow.outer.distance ?? 0.1) * 50}"
          in="SourceAlpha"
          result="shadowOffset"/>
        <feGaussianBlur
          in="shadowOffset"
          stdDeviation="${(config.shadow.outer.size ?? 0.1) * 5}"
          result="shadowBlur"/>
        <feFlood
          flood-color="rgb(${config.shadow.outer.fill?.color?.r ?? 0},${config.shadow.outer.fill?.color?.g ?? 0},${config.shadow.outer.fill?.color?.b ?? 0})"
          flood-opacity="${config.shadow.outer.fill?.alpha ?? 0.5}"/>
        <feComposite operator="in" in2="shadowBlur"/>
      ` : ''}

      <feMerge>
        ${config.shadow?.outer?.active ? '<feMergeNode in="shadowBlur"/>' : ''}
        ${config.depth?.active ? '<feMergeNode in="depthOffset"/>' : ''}
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  `;
}

function createTextLayers(config: TextStudioConfig) {
  const fontSize = config.font?.size ?? 72;
  const fontWeight = config.font?.weight ?? 'bold';
  const fontFamily = config.font?.name ?? 'Arial Black';
  const text = config.text ?? '';

  return `
    <!-- 主文字 -->
    <text
      x="0"
      y="0"
      text-anchor="middle"
      fill="${config.depth?.fill?.gradient?.active ? 'url(#mainGradient)' :
        `rgb(${config.depth?.fill?.color?.r ?? 0},${config.depth?.fill?.color?.g ?? 0},${config.depth?.fill?.color?.b ?? 0})`}"
      filter="url(#textEffect)"
      style="font-size: ${fontSize}px; font-weight: ${fontWeight}; font-family: '${fontFamily}', sans-serif;">
      ${text}
    </text>

    <!-- 轮廓 -->
    ${config.outline?.global?.active ? `
      <text
        x="0"
        y="0"
        text-anchor="middle"
        fill="none"
        stroke="${config.outline.global.fill?.gradient?.active ? 'url(#outlineGradient)' :
          `rgb(${config.outline.global.fill?.color?.r ?? 0},${config.outline.global.fill?.color?.g ?? 0},${config.outline.global.fill?.color?.b ?? 0})`}"
        stroke-width="${(config.outline.global.width ?? 0.1) * 20}"
        stroke-linejoin="${config.outline.global.join ?? 'round'}"
        style="font-size: ${fontSize}px; font-weight: ${fontWeight}; font-family: '${fontFamily}', sans-serif;">
        ${text}
      </text>
    ` : ''}
  `;
}

// 深度合并函数
function deepMerge(target: any, source: any) {
  const result = { ...target };

  for (const key in source) {
    if (source[key] instanceof Object && key in target) {
      result[key] = deepMerge(target[key], source[key]);
    } else if (source[key] !== undefined) {
      result[key] = source[key];
    }
  }

  return result;
}
export const svgEffect = () => createSVGEffect(config, 'HELLO');