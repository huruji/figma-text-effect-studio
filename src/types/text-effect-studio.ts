interface RGB {
  r: number;
  g: number;
  b: number;
}

interface RGBA extends RGB {
  a: number;
}

interface ColorStop {
  r: number;
  g: number;
  b: number;
  pos: number;
}

interface Gradient {
  active: number;
  angle: number;
  colors: ColorStop[];
  type?: 'radial';
}

interface Texture {
  active: number;
  src: string | null;
}

interface Fill {
  alpha: number;
  color: RGB;
  gradient: Gradient;
  texture?: Texture;
  mergeAlpha?: number;
}

interface ShadowFill extends Fill {
  strength?: number;
  mask?: number;
  distance?: number;
  angle?: number;
}

interface OutlineFill extends Fill {
  width: number;
  dash?: number;
  join: 'round' | 'miter' | 'bevel';
  projection?: number;
  shadow?: {
    active: number;
    color: RGBA;
    size: number;
  };
}

interface Outline {
  first: {
    editable: number;
    active: number;
    width: number;
    dash: number;
    join: 'round' | 'miter' | 'bevel';
    fill: OutlineFill;
  };
  second: {
    editable: number;
    active: number;
    width: number;
    dash: number;
    join: 'round' | 'miter' | 'bevel';
    fill: OutlineFill;
  };
  global: {
    active: number;
    width: number;
    join: 'round' | 'miter' | 'bevel';
    projection: number;
    shadow: {
      active: number;
      color: RGBA;
      size: number;
    };
    fill: OutlineFill;
  };
}

interface Shadow {
  outer: {
    editable: number;
    active: number;
    size: number;
    strength: number;
    mask: number;
    distance: number;
    angle: number;
    fill: ShadowFill;
  };
  inner: {
    editable: number;
    active: number;
    size: number;
    strength: number;
    alpha: number;
    color: RGB;
    fill: Fill;
    gradient: Gradient;
    distance: number;
    angle: number;
  };
  inner2: {
    editable: number;
    active: number;
    size: number;
    strength: number;
    alpha: number;
    color: RGB;
    distance: number;
    angle: number;
  };
}

interface Background {
  active: number;
  fill: {
    color: RGB;
    gradient: Gradient;
  };
}

interface Animation {
  active: number;
  id: string;
  pause: number;
  duration: number;
}

interface Color {
  r: number;
  g: number;
  b: number;
}

interface Boggle {
  active: number;
  angle: number;
  amplitude: number;
}

interface ReverseOverlap {
  letters: number;
  lines: number;
}

interface Shadow {
  active: number;
  size: number;
  distance: number;
  angle: number;
  fill: Fill;
}

export interface TextEffectConfig {
  text: string;
  font: {
    size: number;
    src: string;
  };
  align: 'center' | 'left' | 'right';
  rotate: number;
  lineHeight: number;
  letterSpacing: number;
  mergeGradients: number;
  lettering: Lettering;
  fill: {
    editable: number;
    active: number;
    alpha: number;
    color: RGB;
    texture: Texture;
    gradient: Gradient;
  };
  depth: {
    editable: number;
    active: number;
    length: number;
    angle: number;
    fill: Fill;
  };
  depth2: {
    editable: number;
    active: number;
    length: number;
    angle: number;
    fill: Fill;
  };
  outline: Outline;
  shadow: Shadow;
  background: Background;
  animation: Animation;
}

export interface Lettering {
  editable: number;
  active: number;
  blendmode: string;
  boggle: Boggle;
  reverseOverlap: ReverseOverlap;
  shadow: Shadow;
}